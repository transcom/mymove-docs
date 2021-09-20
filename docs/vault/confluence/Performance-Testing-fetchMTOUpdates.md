# Performance Testing `fetchMTOUpdates` Query
## Overview
The `fetchMTOUpdates` endpoint in the Prime API is currently the main way for the Prime to retrieve information about moves the TOO has approved and sent to them, besides the push notification functionality. If push were to ever fail, this is their only way to rectify the situation.

This leaves us in a conundrum because this query is extremely inefficient. We are using Pop's EagerPreload functionality to retrieve all nested info on the move and its orders, the shipments, the addresses, and so on. For the many thousands of moves we expect in peak season, this will not work. 

We also want to give the Prime the ability to filter this list based off the last updated date of the move _and_ it's nested objects - shipments, service items, etc. This is a complex problem, and it is the main issue we are trying to address by rewriting this query. 

We have completed the [`fetchMTOUpdates` Risk Assessment ](https://docs.google.com/document/d/1ggQrF7Cxq9Tfnzzv3WQeuJuJ7uB0txD0JYg69LwEK0k/edit#heading=h.d5b2vwy78o8j) to plan out our remediation of this endpoint. The steps are, briefly:

1. Performance test the options for a `fetchMTOUpdates` query and implement the most performant.
2. Give the Prime other ways to retrieve move data.

This analysis aims to complete Step 1 of this process. Most of these query options were pulled from [this slack thread](https://trussworks.slack.com/archives/CDJ9JAD26/p1616628329057000), with the necessary modifications to make this query fit our requirements.

### Notes on the test
All query options below were run against a dataset with 91 total move records, 24 of which were available to Prime (`available_to_prime_at != null`).

We have the following requirements on the query:

1. The Prime should get move data back. 
2. No moves that are disabled or deleted should be returned. So `show = TRUE` is a requirement.
3. Only moves that are available to Prime should be returned.
4. The query should allow a `since` parameter to be passed in that allows the Prime to see the moves that have been updated or have had nested objects updated since that date.

In an effort to give integrity to the tests, I tried to make each query fit these requirements as possible. However, there are some notable exceptions where the nature of the query made it difficult to create an equal playing field. 

Most notably, Option 3 returns a significantly different dataset than the others. Option 1 also limits which columns can be in the SELECT statement due to the grouping. These issues will be further addressed with each test.

Furthermore, you might notice the absence of addresses in these queries. I will address that in the [conclusion](#conclusion).

### How to read the results
I use PSQL's EXPLAIN ANALYZE command to get the test results. This gives me:
- Postgres' expected computation cost for each step of the query. This is an imaginary unit that roughly translates to how much time they expect the query to take.
- The actual time the query took to execute. 

I will be giving most credence to the actual time spent on the query. But the potential CPU cost is important - the limits of our dataset can make a query seem faster than it will be in a production setting. I try to keep that in mind as well.

Note that UNIONS also seem to be quantifiably more efficient than JOINS: [Speeding up SQL queries by orders of magnitude using UNION](https://www.foxhound.systems/blog/sql-performance-with-union/)

## Tests

### Option 1: Max Greatest
```sql
SELECT moves.*  
FROM moves  
  LEFT JOIN orders ON moves.orders_id = orders.id  
  LEFT JOIN mto_shipments ON moves.id = mto_shipments.move_id  
  LEFT JOIN mto_service_items ON mto_service_items.move_id = moves.id  
  LEFT JOIN payment_requests ON payment_requests.move_id = moves.id  
WHERE moves.available_to_prime_at IS NOT NULL  
  AND moves.show = TRUE  
GROUP BY 1  
HAVING MAX(GREATEST(moves.updated_at,  
                    orders.updated_at,  
                    mto_shipments.updated_at,  
                    mto_service_items.updated_at,  
                    payment_requests.updated_at)) >= '2021/07/16';
```

This query joins the tables we need to check in our `since` parameter and then groups the results so that the MAX `updated_at` date can be aggregated. It is easy to read, relatively easy to filter, but we cannot grab extra columns from the JOINS because of that grouping.

EXPLAIN ANALYZE results:
```
HashAggregate  (cost=33.83..34.00 rows=5 width=143) (actual time=35.382..35.789 rows=2 loops=1)
  Group Key: moves.id
"  Filter: (max(GREATEST((moves.updated_at)::timestamp with time zone, (orders.updated_at)::timestamp with time zone, mto_shipments.updated_at, mto_service_items.updated_at, (payment_requests.updated_at)::timestamp with time zone)) >= '2021-07-16 00:00:00+00'::timestamp with time zone)"
  Rows Removed by Filter: 22
  ->  Hash Right Join  (cost=20.48..32.81 rows=68 width=175) (actual time=27.970..31.985 rows=209 loops=1)
        Hash Cond: (payment_requests.move_id = moves.id)
        ->  Seq Scan on payment_requests  (cost=0.00..11.20 rows=120 width=24) (actual time=0.114..0.653 rows=25 loops=1)
        ->  Hash  (cost=20.00..20.00 rows=38 width=167) (actual time=27.779..28.065 rows=185 loops=1)
              Buckets: 1024  Batches: 1  Memory Usage: 44kB
              ->  Hash Right Join  (cost=14.98..20.00 rows=38 width=167) (actual time=16.767..22.930 rows=185 loops=1)
                    Hash Cond: (mto_shipments.move_id = moves.id)
                    ->  Seq Scan on mto_shipments  (cost=0.00..4.14 rows=114 width=24) (actual time=0.041..1.531 rows=102 loops=1)
                    ->  Hash  (cost=14.71..14.71 rows=22 width=159) (actual time=15.770..15.973 rows=102 loops=1)
                          Buckets: 1024  Batches: 1  Memory Usage: 27kB
                          ->  Hash Right Join  (cost=7.49..14.71 rows=22 width=159) (actual time=11.020..14.393 rows=102 loops=1)
                                Hash Cond: (orders.id = moves.orders_id)
                                ->  Seq Scan on orders  (cost=0.00..6.33 rows=133 width=24) (actual time=0.030..1.729 rows=113 loops=1)
                                ->  Hash  (cost=7.22..7.22 rows=22 width=151) (actual time=9.642..9.737 rows=102 loops=1)
                                      Buckets: 1024  Batches: 1  Memory Usage: 26kB
                                      ->  Hash Right Join  (cost=2.84..7.22 rows=22 width=151) (actual time=1.047..7.605 rows=102 loops=1)
                                            Hash Cond: (mto_service_items.move_id = moves.id)
                                            ->  Seq Scan on mto_service_items  (cost=0.00..4.07 rows=107 width=24) (actual time=0.029..2.377 rows=108 loops=1)
                                            ->  Hash  (cost=2.67..2.67 rows=14 width=143) (actual time=0.824..0.856 rows=24 loops=1)
                                                  Buckets: 1024  Batches: 1  Memory Usage: 12kB
                                                  ->  Seq Scan on moves  (cost=0.00..2.67 rows=14 width=143) (actual time=0.053..0.374 rows=24 loops=1)
                                                        Filter: ((available_to_prime_at IS NOT NULL) AND show)
                                                        Rows Removed by Filter: 67
Planning Time: 1.038 ms
Execution Time: 37.581 ms
```

### Option 2: Mad Joins
```sql
SELECT moves.*  
FROM moves  
  LEFT JOIN orders ON moves.orders_id = orders.id  
  LEFT JOIN mto_shipments ON moves.id = mto_shipments.move_id  
  LEFT JOIN mto_service_items ON mto_service_items.move_id = moves.id  
  LEFT JOIN payment_requests ON payment_requests.move_id = moves.id  
WHERE moves.available_to_prime_at IS NOT NULL  
  AND moves.show = TRUE  
  AND (moves.updated_at >= '2021/07/16' OR  
       orders.updated_at >= '2021/07/16' OR  
       mto_shipments.updated_at >= '2021/07/16' OR  
       mto_service_items.updated_at >= '2021/07/16' OR  
       payment_requests.updated_at >= '2021/07/16')  
GROUP BY 1;
 ```

This query is extremely similar to the first, with the main difference being the compound OR statement instead of the GREATEST aggregate function.

EXPLAIN ANALYZE results:
```
HashAggregate  (cost=33.34..33.48 rows=14 width=143) (actual time=25.897..26.724 rows=2 loops=1)
  Group Key: moves.id
  ->  Hash Right Join  (cost=20.48..33.28 rows=23 width=143) (actual time=24.569..26.278 rows=3 loops=1)
        Hash Cond: (payment_requests.move_id = moves.id)
        Filter: ((moves.updated_at >= '2021-07-16 00:00:00'::timestamp without time zone) OR (orders.updated_at >= '2021-07-16 00:00:00'::timestamp without time zone) OR (mto_shipments.updated_at >= '2021-07-16 00:00:00+00'::timestamp with time zone) OR (mto_service_items.updated_at >= '2021-07-16 00:00:00+00'::timestamp with time zone) OR (payment_requests.updated_at >= '2021-07-16 00:00:00'::timestamp without time zone))
        Rows Removed by Filter: 206
        ->  Seq Scan on payment_requests  (cost=0.00..11.20 rows=120 width=24) (actual time=0.040..0.432 rows=25 loops=1)
        ->  Hash  (cost=20.00..20.00 rows=38 width=167) (actual time=24.479..24.936 rows=185 loops=1)
              Buckets: 1024  Batches: 1  Memory Usage: 44kB
              ->  Hash Right Join  (cost=14.98..20.00 rows=38 width=167) (actual time=17.456..22.166 rows=185 loops=1)
                    Hash Cond: (mto_shipments.move_id = moves.id)
                    ->  Seq Scan on mto_shipments  (cost=0.00..4.14 rows=114 width=24) (actual time=0.026..1.373 rows=102 loops=1)
                    ->  Hash  (cost=14.71..14.71 rows=22 width=159) (actual time=16.364..16.589 rows=102 loops=1)
                          Buckets: 1024  Batches: 1  Memory Usage: 27kB
                          ->  Hash Right Join  (cost=7.49..14.71 rows=22 width=159) (actual time=8.800..14.358 rows=102 loops=1)
                                Hash Cond: (orders.id = moves.orders_id)
                                ->  Seq Scan on orders  (cost=0.00..6.33 rows=133 width=24) (actual time=0.026..1.943 rows=113 loops=1)
                                ->  Hash  (cost=7.22..7.22 rows=22 width=151) (actual time=7.921..8.059 rows=102 loops=1)
                                      Buckets: 1024  Batches: 1  Memory Usage: 26kB
                                      ->  Hash Right Join  (cost=2.84..7.22 rows=22 width=151) (actual time=1.478..6.331 rows=102 loops=1)
                                            Hash Cond: (mto_service_items.move_id = moves.id)
                                            ->  Seq Scan on mto_service_items  (cost=0.00..4.07 rows=107 width=24) (actual time=0.082..1.728 rows=108 loops=1)
                                            ->  Hash  (cost=2.67..2.67 rows=14 width=143) (actual time=1.323..1.377 rows=24 loops=1)
                                                  Buckets: 1024  Batches: 1  Memory Usage: 12kB
                                                  ->  Seq Scan on moves  (cost=0.00..2.67 rows=14 width=143) (actual time=0.030..0.488 rows=24 loops=1)
                                                        Filter: ((available_to_prime_at IS NOT NULL) AND show)
                                                        Rows Removed by Filter: 67
Planning Time: 0.630 ms
Execution Time: 27.110 ms
```

 ### Option 3: Flattening
 ```sql
WITH orders_flat AS (  
  SELECT id AS orders_id,  
         NULL AS item_id,  
         updated_at,  
         'ORDER' AS type_name  
  FROM orders  
  UNION ALL  
  SELECT o1.id,  
         sm.id,  
         sm.updated_at,  
         'CUSTOMER' AS type_name  
  FROM orders o1  
    INNER JOIN service_members sm ON o1.service_member_id = sm.id)  
SELECT move_id,  
       id,  
       updated_at,  
       'SI' AS type_name  
FROM mto_service_items  
UNION ALL  
SELECT id,  
       NULL,  
       updated_at,  
       'MOVE' AS type_name  
FROM moves  
UNION ALL  
SELECT move_id,  
       id,  
       updated_at,  
       'SHIPMENT' AS type_name  
FROM mto_shipments  
UNION ALL  
SELECT move_id,  
       id,  
       updated_at,  
       'PAYMENTREQ' AS type_name  
FROM payment_requests pr  
UNION ALL  
SELECT moves.id AS move_id,  
       moves.orders_id AS id,  
       MAX(orders_flat.updated_at) AS updated_at,  
       'ORDER' AS type_name  
FROM moves  
  JOIN orders_flat ON moves.orders_id = orders_flat.orders_id  
WHERE moves.available_to_prime_at IS NOT NULL  
  AND moves.show = TRUE
  AND (moves.updated_at >= '2021/07/16' OR  
       orders_flat.updated_at >= '2021/07/16')
GROUP BY moves.id;
```

This query takes a markedly different approach from the others. It flattens the full dataset into a table of IDs and a column for the name of the object the IDs belong to. This results of this query would therefore need to be massaged into a form that groups objects based on the move they belong to, which may be disadvantageous. This query would likely need to be run into something akin to a MATERIALIZED VIEW to handle the output. 

Note that it does, however, give a more complete image of all the objects involved in the `since` check, which is missing from all other options. It also grabs the service member info, which I have left off of other queries. I discuss what info should be pulled out of the queries more in the conclusion.

EXPLAIN ANALYZE results:
```
Append  (cost=0.00..55.35 rows=414 width=72) (actual time=0.145..42.856 rows=327 loops=1)
  ->  Seq Scan on mto_service_items  (cost=0.00..4.07 rows=107 width=72) (actual time=0.122..1.919 rows=108 loops=1)
"  ->  Subquery Scan on ""*SELECT* 2""  (cost=0.00..3.51 rows=67 width=72) (actual time=0.048..4.766 rows=91 loops=1)"
        ->  Seq Scan on moves  (cost=0.00..2.67 rows=67 width=72) (actual time=0.025..1.940 rows=91 loops=1)
  ->  Seq Scan on mto_shipments  (cost=0.00..4.14 rows=114 width=72) (actual time=0.041..1.983 rows=102 loops=1)
"  ->  Subquery Scan on ""*SELECT* 4""  (cost=0.00..12.70 rows=120 width=72) (actual time=0.049..0.864 rows=25 loops=1)"
        ->  Seq Scan on payment_requests pr  (cost=0.00..11.20 rows=120 width=72) (actual time=0.028..0.270 rows=25 loops=1)
"  ->  Subquery Scan on ""*SELECT* 5""  (cost=26.47..26.65 rows=6 width=72) (actual time=23.995..24.474 rows=1 loops=1)"
        ->  GroupAggregate  (cost=26.47..26.58 rows=6 width=72) (actual time=23.948..24.379 rows=1 loops=1)
              Group Key: moves_1.id
              ->  Sort  (cost=26.47..26.49 rows=6 width=40) (actual time=23.765..24.218 rows=2 loops=1)
                    Sort Key: moves_1.id
                    Sort Method: quicksort  Memory: 25kB
                    ->  Hash Join  (cost=2.84..26.40 rows=6 width=40) (actual time=2.783..23.987 rows=2 loops=1)
                          Hash Cond: (orders.id = moves_1.orders_id)
                          Join Filter: ((moves_1.updated_at >= '2021-07-16 00:00:00'::timestamp without time zone) OR (orders.updated_at >= '2021-07-16 00:00:00'::timestamp without time zone))
                          Rows Removed by Join Filter: 46
                          ->  Append  (cost=0.00..22.27 rows=266 width=24) (actual time=0.046..20.424 rows=226 loops=1)
                                ->  Seq Scan on orders  (cost=0.00..6.33 rows=133 width=24) (actual time=0.028..1.801 rows=113 loops=1)
"                                ->  Subquery Scan on ""*SELECT* 2_1""  (cost=6.59..14.61 rows=133 width=24) (actual time=4.801..13.246 rows=113 loops=1)"
                                      ->  Hash Join  (cost=6.59..13.28 rows=133 width=72) (actual time=4.770..9.817 rows=113 loops=1)
                                            Hash Cond: (o1.service_member_id = sm.id)
                                            ->  Seq Scan on orders o1  (cost=0.00..6.33 rows=133 width=32) (actual time=0.086..1.771 rows=113 loops=1)
                                            ->  Hash  (cost=5.15..5.15 rows=115 width=24) (actual time=4.370..4.404 rows=115 loops=1)
                                                  Buckets: 1024  Batches: 1  Memory Usage: 15kB
                                                  ->  Seq Scan on service_members sm  (cost=0.00..5.15 rows=115 width=24) (actual time=0.085..2.318 rows=115 loops=1)
                          ->  Hash  (cost=2.67..2.67 rows=14 width=40) (actual time=0.644..0.688 rows=24 loops=1)
                                Buckets: 1024  Batches: 1  Memory Usage: 10kB
                                ->  Seq Scan on moves moves_1  (cost=0.00..2.67 rows=14 width=40) (actual time=0.036..0.309 rows=24 loops=1)
                                      Filter: ((available_to_prime_at IS NOT NULL) AND show)
                                      Rows Removed by Filter: 67
Planning Time: 0.699 ms
Execution Time: 47.929 ms
```

### Option 4: Unions
```sql
SELECT moves.*  
FROM moves  
WHERE moves.available_to_prime_at IS NOT NULL  
  AND moves.show = TRUE  
  AND (moves.updated_at >= '2021/07/16' OR  
       (moves.id IN (  
          SELECT mto_shipments.move_id  
          FROM mto_shipments  
          WHERE mto_shipments.updated_at >= '2021/07/16'  
          UNION  
          SELECT mto_service_items.move_id  
          FROM mto_service_items  
          WHERE mto_service_items.updated_at >= '2021/07/16'  
          UNION  
          SELECT payment_requests.move_id  
          FROM payment_requests  
          WHERE payment_requests.updated_at >= '2021/07/16')) OR  
       (moves.orders_id IN (  
          SELECT orders.id  
          FROM orders  
          WHERE orders.updated_at >= '2021/07/16')));
```

This approach uses UNIONS instead of JOINS, which are quantifiably more efficient. The OR checks also save a lot of the heavy processing for the cases where it is actually needed, as opposed to always doing it upfront. 

EXPLAIN ANALYZE results:
```
Seq Scan on moves  (cost=28.19..31.36 rows=11 width=143) (actual time=1.345..1.711 rows=2 loops=1)
  Filter: ((available_to_prime_at IS NOT NULL) AND show AND ((updated_at >= '2021-07-16 00:00:00'::timestamp without time zone) OR (hashed SubPlan 1) OR (hashed SubPlan 2)))
  Rows Removed by Filter: 89
  SubPlan 1
    ->  HashAggregate  (cost=21.00..21.42 rows=42 width=16) (actual time=1.066..1.188 rows=2 loops=1)
          Group Key: mto_shipments.move_id
          ->  Append  (cost=0.00..20.89 rows=42 width=16) (actual time=0.177..1.024 rows=2 loops=1)
                ->  Seq Scan on mto_shipments  (cost=0.00..4.42 rows=1 width=16) (actual time=0.137..0.208 rows=1 loops=1)
                      Filter: (updated_at >= '2021-07-16 00:00:00+00'::timestamp with time zone)
                      Rows Removed by Filter: 101
                ->  Seq Scan on mto_service_items  (cost=0.00..4.34 rows=1 width=16) (actual time=0.357..0.388 rows=1 loops=1)
                      Filter: (updated_at >= '2021-07-16 00:00:00+00'::timestamp with time zone)
                      Rows Removed by Filter: 107
                ->  Seq Scan on payment_requests  (cost=0.00..11.50 rows=40 width=16) (actual time=0.082..0.091 rows=0 loops=1)
                      Filter: (updated_at >= '2021-07-16 00:00:00'::timestamp without time zone)
                      Rows Removed by Filter: 25
  SubPlan 2
    ->  Seq Scan on orders  (cost=0.00..6.66 rows=1 width=16) (actual time=0.065..0.075 rows=0 loops=1)
          Filter: (updated_at >= '2021-07-16 00:00:00'::timestamp without time zone)
          Rows Removed by Filter: 113
Planning Time: 2.505 ms
Execution Time: 2.550 ms
```

## Simplified Results
| | Option 1 | Option 2 | Option 3 | Option 4 |
|---|---|---|---|---|
| **Potential CPU Cost** | 34.00 | 33.48 | 55.35 | 31.36 |
| **Total Processing Time** | 38.619 ms | 27.740 ms | 48.618 ms | 5.055 ms |


## Winner
**Option 4: Unions** had the best results. Notable downsides are that we cannot see the connected shipments, service items, or payment requests. This is a consistent theme for all options except the flattening one, which was the most expensive by far. The moral here is that we need to limit our references to get any real gains in performance.

This query is also easily manipulated in case we need to update it later. For example, here's a version that JOINS with orders for the sake of returning more useful information in the output:

```sql
SELECT moves.*,  
       orders.report_by_date,  
       orders.orders_number  
FROM moves  
  INNER JOIN orders ON moves.orders_id = orders.id  
WHERE moves.available_to_prime_at IS NOT NULL  
  AND moves.show = TRUE  
  AND (moves.updated_at >= '2021/07/16' OR  
       orders.updated_at >= '2021/07/16' OR  
       (moves.id IN (  
          SELECT mto_shipments.move_id  
          FROM mto_shipments  
          WHERE mto_shipments.updated_at >= '2021/07/16'  
          UNION  
          SELECT mto_service_items.move_id  
          FROM mto_service_items  
          WHERE mto_service_items.updated_at >= '2021/07/16'  
          UNION  
          SELECT payment_requests.move_id  
          FROM payment_requests  
          WHERE payment_requests.updated_at >= '2021/07/16')));
```

And the results are still great, with a max cost of 31.44 and total time of 4.951 ms.

## Conclusion
We have to make concessions to have a performant fetch query on all moves. These queries are comparable as they are, but in reality, there is even more depth to evaluate for an `updatedAt` that meets the criteria. We may have to just accept that it is not reasonable to take all sub-objects into consideration for this query. In particular:

* We can skip `entitlements`. An entitlement should never be updated without the corresponding order being amended and updated as well. So `orders.updated_at` is sufficient for entitlements.
* We can skip `duty_stations` and their connected addresses. A duty station itself should not be updated significantly (can't just move a whole station to a new zipcode willy nilly). If a duty station is changed, the order will be updated with the new foreign key reference. Therefore, `orders.updated_at` is also sufficient in this case.

More difficult choices:

* We can skip the subobjects in `mto_shipments`, `mto_service_items`, and `payment_requests`. This is, frankly, not actually ideal. However, many of the updates to these subobjects are either automatic or coming from the Prime themselves. Additionally, the main `status` field that is the most important related to processing is on these main objects. Decisions from the TOO or TIO should accompany most updates, so basing our filter on the parent object might actually catch almost all updates of the subobjects as well.
* We can skip the updates to `service_member`. This is not covered by other updates, unfortunately. But from a process perspective, this info is not critical for the execution of the move (although it is important for coordinating with the customer). 

Ultimately, one fail safe is not enough to cover the potential failure of push notifications. We cannot, and we _should not_ rely on one fetch to fill in the gaps for the Prime. We should instead provide a variety of methods for the Prime to search for the data they need.

To that end, pagination and filtering, in addition to a shipment list endpoint, would be great additions to the Prime API. More flexible GETs are our allies in a more performant system.

## Implementation
The next steps to implement this new query will be:
- Update the service object `fetchMTOUpdates` points at to use this new query. Check that no other endpoints are adversely affected by this.
- Update the `prime.yaml` to show that the endpoint will no longer return info on all nested objects.
- Add a `getMoveByLocator` endpoint to allow more flexibility in how we retrieve moves. Not required, but would be nice to have.
- Consider a `listShipments` endpoint that has pagination and filtering.
- Consider more fetch endpoints.