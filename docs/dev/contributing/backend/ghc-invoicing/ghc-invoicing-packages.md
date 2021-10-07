# GHC Invoicing Packages

High level overview diagrams
* [Sequence diagram](https://miro.com/app/board/o9J_ls9Gt7E=/?moveToWidget=3074457365163319192&cot=14)


## Bins
TODO description!

`ghc-pricing-parser` used to read the pricing template and import data into the GHC rate engine. A fake pricing template was created to test with.


```
mymove/
├── bin
│   ├── generate-payment-request-edi
│   ├── ghc-pricing-parser
│   ├── prime-api-client
│   ├── send-to-gex
```

## CLI tools
TODO description!
```
mymove/
├── cmd
│   ├── generate-payment-request-edi
│   │   ├── logger.go
│   │   └── main.go
│   ├── ghc-pricing-parser
│   │   └── main.go
│   ├── milmove
│   │   ├── bin
│   │   │   └── Mymove_server
│   ├── milmove-tasks
│   │   ├── connect_to_gex_via_sftp.go
│   │   ├── main.go
│   │   ├── post_file_to_gex.go
│   │   ├── process_edis.go
│   │   ├── save_ghc_fuel_price_data.go
│   ├── prime-api-client
│   │   ├── main.go
│   │   ├── prime
│   │   ├── support
│   │   │   ├── get_payment_request_edi.go
│   │   │   ├── hide_non_fake_move_task_orders.go
│   │   │   ├── process_reviewed_payment_requests.go
│   │   │   ├── recalculate_payment_request.go
│   │   │   └── update_payment_request_status.go
│   ├── send-to-gex
│   │   └── main.go
```

## [Payment Request](https://github.com/transcom/mymove/tree/master/pkg/payment_request)
TODO description!

```
/mymove/pkg/payment_request
├── payment_request_helper.go
├── payment_request_helper_test.go
├── send_to_syncada.go
├── send_to_syncada_test.go
├── service_param_list_fetcher.go
├── service_param_list_valid.go
├── service_param_list_valid_test.go
```

## [Service Param Value Lookups](https://github.com/transcom/mymove/tree/master/pkg/payment_request/service_param_value_lookups)
TODO description!

```
/mymove/pkg/payment_request/service_param_value_lookups
└── service_param_value_lookups
    ├── actual_pickup_date_lookup.go
    ├── actual_pickup_date_lookup_test.go
    ├── contract_code_lookup.go
    ├── contract_code_lookup_test.go
    ├── cubic_feet_billed_lookup.go
    ├── cubic_feet_billed_lookup_test.go
    ├── cubic_feet_crating_lookup.go
    ├── cubic_feet_crating_lookup_test.go
    ├── dimension_height_lookup.go
    ├── dimension_height_lookup_test.go
    ├── dimension_length_lookup.go
    ├── dimension_length_lookup_test.go
    ├── dimension_width_lookup.go
    ├── dimension_width_lookup_test.go
    ├── distance_zip3_lookup.go
    ├── distance_zip3_lookup_test.go
    ├── distance_zip5_lookup.go
    ├── distance_zip5_lookup_test.go
    ├── distance_zip_sit_dest_lookup.go
    ├── distance_zip_sit_dest_lookup_test.go
    ├── distance_zip_sit_origin_lookup.go
    ├── distance_zip_sit_origin_lookup_test.go
    ├── eia_fuel_price_lookup.go
    ├── eia_fuel_price_lookup_test.go
    ├── fsc_weight_based_distance_multiplier_lookup.go
    ├── fsc_weight_based_distance_multiplier_lookup_test.go
    ├── lookup_query_helpers.go
    ├── lookup_query_helpers_test.go
    ├── mto_available_to_prime_at_lookup.go
    ├── mto_available_to_prime_at_lookup_test.go
    ├── not_implemented_lookup.go
    ├── number_days_sit_lookup.go
    ├── number_days_sit_lookup_test.go
    ├── psi_domestic_linehaul_lookup.go
    ├── psi_domestic_linehaul_lookup_test.go
    ├── requested_pickup_date_lookup.go
    ├── requested_pickup_date_lookup_test.go
    ├── service_area_lookup.go
    ├── service_area_lookup_test.go
    ├── service_param_value_lookups.go
    ├── service_param_value_lookups_test.go
    ├── service_params_cache.go
    ├── service_params_cache_test.go
    ├── services_schedule_lookup.go
    ├── services_schedule_lookup_test.go
    ├── sit_schedule_lookup.go
    ├── sit_schedule_lookup_test.go
    ├── weight_adjusted_lookup.go
    ├── weight_adjusted_lookup_test.go
    ├── weight_billed_lookup.go
    ├── weight_billed_lookup_test.go
    ├── weight_estimated_lookup.go
    ├── weight_estimated_lookup_test.go
    ├── weight_original_lookup.go
    ├── weight_original_lookup_test.go
    ├── weight_reweigh_lookup.go
    ├── weight_reweigh_lookup_test.go
    ├── zip_address_lookup.go
    ├── zip_address_lookup_test.go
    ├── zip_sit_origin_hhg_actual_address_lookup.go
    ├── zip_sit_origin_hhg_actual_address_lookup_test.go
    ├── zip_sit_origin_hhg_original_address_lookup.go
    └── zip_sit_origin_hhg_original_address_lookup_test.go
```

## DB tools
TODO description!

```
mymove/pkg/services
├── db_tools.go
├── dbtools
│   ├── db_tools_service_test.go
│   ├── logger.go
│   ├── table_from_slice_creator.go
│   └── table_from_slice_creator_test.go
```

## Pre-GHC MilMove FuelPrice
TODO description!

```
mymove/pkg/services
├── fuelprice
│   ├── diesel_fuel_price_storer.go
│   ├── diesel_fuel_price_storer_test.go
│   └── fuel_price_service_test.go
```

## [MilMove GHC FuelPrice](https://github.com/transcom/mymove/tree/master/pkg/services/ghcdieselfuelprice)
TODO description!

```
mymove/pkg/services
├── ghcdieselfuelprice
│   ├── ghc_diesel_fuel_price_data.go
│   ├── ghc_diesel_fuel_price_fetcher.go
│   ├── ghc_diesel_fuel_price_fetcher_test.go
│   ├── ghc_diesel_fuel_price_storer.go
│   ├── ghc_diesel_fuel_price_storer_test.go
│   └── ghc_diesel_fuel_price_test.go
```

## [GHC Import](https://github.com/transcom/mymove/tree/master/pkg/services/ghcimport)
TODO description!

```
mymove/pkg/services
├── ghcimport
│   ├── fixtures
│   │   ├── re_services_data.sql
│   │   └── stage_ghc_pricing.sql
│   ├── ghc_rateengine_importer.go
│   ├── ghc_rateengine_importer_test.go
│   ├── import_re_contract.go
│   ├── import_re_contract_test.go
│   ├── import_re_contract_years.go
│   ├── import_re_contract_years_test.go
│   ├── import_re_domestic_accessorial_prices.go
│   ├── import_re_domestic_accessorial_prices_test.go
│   ├── import_re_domestic_linehaul_prices.go
│   ├── import_re_domestic_linehaul_prices_test.go
│   ├── import_re_domestic_other_prices.go
│   ├── import_re_domestic_other_prices_test.go
│   ├── import_re_domestic_service_area.go
│   ├── import_re_domestic_service_area_prices.go
│   ├── import_re_domestic_service_area_prices_test.go
│   ├── import_re_domestic_service_area_test.go
│   ├── import_re_intl_accessorial_prices.go
│   ├── import_re_intl_accessorial_prices_test.go
│   ├── import_re_intl_other_prices.go
│   ├── import_re_intl_other_prices_test.go
│   ├── import_re_intl_prices.go
│   ├── import_re_intl_prices_test.go
│   ├── import_re_rate_area.go
│   ├── import_re_rate_area_test.go
│   ├── import_re_shipment_type_prices.go
│   ├── import_re_shipment_type_prices_test.go
│   ├── import_re_task_order_fees.go
│   ├── import_re_task_order_fees_test.go
│   ├── load_service_map.go
│   ├── load_service_map_test.go
│   ├── logger.go
│   ├── map_zip_codes_to_re_rate_areas.go
│   ├── map_zip_codes_to_re_rate_areas_test.go
│   ├── shared.go
│   ├── shared_test.go
│   ├── zip3_to_rate_area_mappings.go
│   └── zip5_to_rate_area_mappings.go
```

## [GHC Rate Engine](https://github.com/transcom/mymove/tree/master/pkg/services/ghcrateengine)
TODO description!

```
mymove/pkg/services
├── ghc_rate_engine.go
├── ghcrateengine
│   ├── counseling_services_pricer.go
│   ├── counseling_services_pricer_test.go
│   ├── domestic_crating_pricer.go
│   ├── domestic_crating_pricer_test.go
│   ├── domestic_destination_additional_days_sit_pricer.go
│   ├── domestic_destination_additional_days_sit_pricer_test.go
│   ├── domestic_destination_first_day_sit_pricer.go
│   ├── domestic_destination_first_day_sit_pricer_test.go
│   ├── domestic_destination_pricer.go
│   ├── domestic_destination_pricer_test.go
│   ├── domestic_destination_shuttling_pricer.go
│   ├── domestic_destination_shuttling_pricer_test.go
│   ├── domestic_destination_sit_delivery_pricer.go
│   ├── domestic_destination_sit_delivery_pricer_test.go
│   ├── domestic_linehaul_pricer.go
│   ├── domestic_linehaul_pricer_test.go
│   ├── domestic_origin_additional_days_sit_pricer.go
│   ├── domestic_origin_additional_days_sit_pricer_test.go
│   ├── domestic_origin_first_day_sit_pricer.go
│   ├── domestic_origin_first_day_sit_pricer_test.go
│   ├── domestic_origin_pricer.go
│   ├── domestic_origin_pricer_test.go
│   ├── domestic_origin_shuttling_pricer.go
│   ├── domestic_origin_shuttling_pricer_test.go
│   ├── domestic_origin_sit_pickup_pricer.go
│   ├── domestic_origin_sit_pickup_pricer_test.go
│   ├── domestic_pack_pricer.go
│   ├── domestic_pack_pricer_test.go
│   ├── domestic_shorthaul_pricer.go
│   ├── domestic_shorthaul_pricer_test.go
│   ├── domestic_uncrating_pricer.go
│   ├── domestic_uncrating_pricer_test.go
│   ├── domestic_unpack_pricer.go
│   ├── domestic_unpack_pricer_test.go
│   ├── fuel_surcharge_pricer.go
│   ├── fuel_surcharge_pricer_test.go
│   ├── ghc_rate_engine_service_test.go
│   ├── management_services_pricer.go
│   ├── management_services_pricer_test.go
│   ├── param_convert.go
│   ├── param_convert_test.go
│   ├── pricer_formatters.go
│   ├── pricer_formatters_test.go
│   ├── pricer_helpers.go
│   ├── pricer_helpers_test.go
│   ├── pricer_query_helpers.go
│   ├── pricer_query_helpers_test.go
│   ├── service_item_pricer.go
│   ├── service_item_pricer_test.go
│   ├── shared.go
│   └── shared_test.go
```

## [Invoice](https://github.com/transcom/mymove/tree/master/pkg/services/invoice)
TODO description!

```
mymove/pkg/services
├── invoice
│   ├── gex_sender_http.go
│   ├── gex_sender_http_test.go
│   ├── ghc_payment_request_invoice_generator.go
│   ├── ghc_payment_request_invoice_generator_test.go
│   ├── invoice_service_test.go
│   ├── invoice_upload_updater.go
│   ├── process_edi824.go
│   ├── process_edi824_test.go
│   ├── process_edi997.go
│   ├── process_edi997_test.go
│   ├── sftp_client_wrapper.go
│   ├── store_invoice.go
│   ├── syncada_sftp_reader.go
│   ├── syncada_sftp_reader_test.go
│   ├── syncada_sftp_sender.go
│   └── syncada_sftp_sender_test.go
├── invoice.go
```

## [MTO Shipment Updater](https://github.com/transcom/mymove/blob/master/pkg/services/mto_shipment/mto_shipment_updater.go)
TODO description!

[updateShipmentRecord](https://github.com/transcom/mymove/blob/master/pkg/services/mto_shipment/mto_shipment_updater.go#L315) calls [ShipmentRecalculatePaymentRequest](https://github.com/transcom/mymove/blob/master/pkg/services/mto_shipment/mto_shipment_updater.go#L519)

```
mymove/pkg/services
├── mto_shipment
│   ├── mto_shipment_updater.go
│   ├── mto_shipment_updater_test.go
├── mto_shipment.go
```

## [Payment Request](https://github.com/transcom/mymove/tree/master/pkg/services/payment_request)
```
mymove/pkg/services
├── payment_request
│   ├── payment_request_creator.go
│   ├── payment_request_creator_test.go
│   ├── payment_request_fetcher.go
│   ├── payment_request_fetcher_test.go
│   ├── payment_request_list_fetcher.go
│   ├── payment_request_list_fetcher_test.go
│   ├── payment_request_recalculator.go
│   ├── payment_request_recalculator_test.go
│   ├── payment_request_reviewed_fetcher.go
│   ├── payment_request_reviewed_fetcher_test.go
│   ├── payment_request_reviewed_processor.go
│   ├── payment_request_reviewed_processor_test.go
│   ├── payment_request_service_test.go
│   ├── payment_request_shipment_recalculate.go
│   ├── payment_request_shipment_recalculate_test.go
│   ├── payment_request_shipments_sit_balance.go
│   ├── payment_request_shipments_sit_balance_test.go
│   ├── payment_request_status_updater.go
│   ├── payment_request_status_updater_test.go
│   ├── upload_creator.go
│   └── upload_creator_test.go
├── payment_request.go
```

## [Reweigh Updater](https://github.com/transcom/mymove/blob/master/pkg/services/reweigh/reweigh_updater.go)
[doUpdateReweigh](https://github.com/transcom/mymove/blob/master/pkg/services/reweigh/reweigh_updater.go#L58) calls [ShipmentRecalculatePaymentRequest](https://github.com/transcom/mymove/blob/master/pkg/services/reweigh/reweigh_updater.go#L124)
```
mymove/pkg/services
├── reweigh
│   ├── reweigh_updater.go
│   ├── reweigh_updater_test.go
├── reweigh.go
```