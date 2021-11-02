---
sidebar_position: 20
---

# Zip code to Rate area mappings

The mymove rate engine uses zip code to rate area associations to calculate a number of values related to billing for a move.

There is no existing, definitive data set of these associations, so mymove has published its own data set as a declaration of the standard being used.

This data set will evolve over time, but should be used when
* A mymove engineer needs to reference mymove's current authoritative data set for zip code to rate area associations.
* A mymove engineer wants to verify if the zip code to rate area associations currently being used by mymove are correct.
* An external party wants to know what zip code to rate area associations mymove is currently using.

### Zip Code to Rate Area Mappings
* #### [Zip3 to Rate Area Mappings](/transcom/mymove/blob/master/pkg/services/ghcimport/fixtures/tariff400ng_zip3s_fixture.csv "Zip3 to Rate Area Associations")
  * **Note:** Some `zip3s` span multiple `rate_areas`. This happens specifically in larger states: CA, TX, and FL. In the case that a `zip3` spans multiple `rate_areas`, the `zip3's` `rate_area` value will be `ZIP` in the data set. A more specific `zip5` will be used to determine the `rate_area` in these cases.


* #### [Zip5 to Rate Area Mappings](/transcom/mymove/blob/master/pkg/services/ghcimport/fixtures/tariff400ng_zip5_rate_areas_fixture.csv "Zip5 to Rate Area Associations")




