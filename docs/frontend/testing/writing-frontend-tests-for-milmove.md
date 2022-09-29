---
sidebar_position: 5
---

# Writing Frontend Tests for MilMove

This guide covers how MilMove writes tests using RTL. 
Perhaps you have stumbled across this guide, but are looking for generic strategies. That is covered in [this wiki](writing-tests-using-react-testing-library-and-jest.md).

## Common Mocks

### React Router Dom
```
const mockPush = jest.fn();
const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/',
  }),
  useHistory: () => ({
    push: mockPush,
    goBack: mockGoBack,
  }),
}));
```

What is this used for? 
A lot of pages have buttons that take the user to different places. We want to verify that users get redirected properly

### Internal API
```
jest.mock('services/internalApi', () => ({
  ...jest.requireActual('services/internalApi'),
  someApiCall: someFunction
}));
```

What is this used for? 
A lot of components make service calls to the API. Being component tests, we don't actually want those to make calls to the service because that will make our tests brittle. Instead, we mock out the service calls that we need.

## Factories
There are factories available to make it easy to generate data in your front-end tests. Prefer factories to passing manual props. To use them, just call the factory:

```javascript
const address = addressFactory();
```

For details about overriding test data and writing new factories, refer to [this wiki](using-factories-to-generate-data-for-frontend-tests.md). 

## Common Props 
Please feel free to change the data itself. These are mainly meant to cover common props that components tend to use. 
### Service Member
```
serviceMember: {
  id: '666',
  current_station: {
    name: 'Test Duty Station',
  },
  residential_address: {
    city: 'New York',
    postal_code: '10001',
    state: 'NY',
    street_address_1: '123 Main St',
  },
  affiliation: 'Navy',
  edipi: '123567890',
  personal_email: 'test@email.com',
  first_name: 'Tester',
  last_name: 'Testing',
  rank: 'RANK',
  telephone: '123-555-7890',
}
```
### Current Orders
```
currentOrders: {
  orders_type: 'PERMANENT_CHANGE_OF_STATION',
  has_dependents: false,
  issue_date: '2020-08-11',
  grade: 'RANK',
  moves: ['123'],
  origin_duty_station: {
    name: 'Test Duty Station',
    address: {
      postal_code: '123456',
    },
  },
  new_duty_station: {
    name: 'New Test Duty Station',
    address: {
      postal_code: '123456',
    },
  },
  report_by_date: '2020-08-31',
  service_member_id: '666',
  spouse_has_pro_gear: false,
  status: MOVE_STATUSES.DRAFT,
  uploaded_orders: {
    uploads: [],
  },
},
```
### MTO Shipments 
```
mtoShipments: [
  {
    id: 'testMtoShipment789',
    agents: [],
    customerRemarks: 'please be carefule',
    moveTaskOrderID: '123',
    pickupAddress: {
      city: 'Beverly Hills',
    },
    requestedDeliveryDate: '2020-08-31',
    requestedPickupDate: '2020-08-31',
    shipmentType: 'HHG',
    status: MOVE_STATUSES.SUBMITTED,
    updatedAt: '2020-09-02T21:08:38.392Z',
  },
],
```
### MTO Shipment
```
mtoShipment: {
  id: 'testMtoShipment789',
  agents: [],
  customerRemarks: 'please be careful',
  moveTaskOrderID: '123',
  pickupAddress: {
    city: 'Beverly Hills',
  },
  requestedDeliveryDate: '2020-08-31',
  requestedPickupDate: '2020-08-31',
  shipmentType: 'HHG',
  status: MOVE_STATUSES.SUBMITTED,
  updatedAt: '2020-09-02T21:08:38.392Z',
},
```
### Current Move
```
currentMove: {
  id: '123',
  locator: 'CXVV3F',
  selected_move_type: 'HHG',
  service_member_id: '666',
  status: MOVE_STATUSES.DRAFT,
},
```
### Backup Contact
```
backup_contact: {
  name: 'Peyton Wing',
  email: 'pw@example.com',
  telephone: '915-555-8761',
}
```
### Releasing / Receiving Agent
```
agent: {
  firstName: 'Jo',
  lastName: 'Xi',
  phone: '(555) 555-5555',
  email: 'jo.xi@email.com',
},
```
### Entitlement
```
entitlement: {
  authorizedWeight: 5000,
  dependentsAuthorized: true,
  eTag: 'MjAyMC0wOS0xNFQxNzo0MTozOC42ODAwOVo=',
  id: '0dbc9029-dfc5-4368-bc6b-dfc95f5fe317',
  nonTemporaryStorage: true,
  privatelyOwnedVehicle: true,
  proGearWeight: 2000,
  proGearWeightSpouse: 500,
  storageInTransit: 2,
  totalDependents: 1,
  totalWeight: 5000,
},
```
