---
sidebar_position: 4
---
# Set Up Service Subpackage and Interface

Since we're going to be creating data service objects, we'll be following the guidelines in
[Structure - Data/Utility High Level Structure](/docs/backend/guides/service-objects/structure#datautility-service-objects-high-level-structure).
In our case, that means creating a subpackage in the `services` package called `cat` and a corresponding interface
file called `cat.go`, like this:

```text {6,10}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── audit/
│   │   ├── cat/                       <- our new subpackage
│   │   ├── customer_support_remarks/
│   │   ├── ...
│   │   ├── audit.go
│   │   ├── cat.go                     <- our new interface in the services package
│   │   ├── customer.go
│   │   ├── ...
```

Now we'll add the boilerplate testing suite setup mentioned in
[Service Object Subpackage Structure](./structure#service-object-subpackage-structure). We'll add a file called
`cat_service_test.go` in the `cat` subpackage like so:

```text {7}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── audit/
│   │   ├── cat/
│   │   │   ├── cat_service_test.go    <- boilerplate testing suite setup
│   │   ├── customer_support_remarks/
│   │   ├── ...
```

Here is what the file will contain:

```go
package cat

import (
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/transcom/mymove/pkg/testingsuite"
)

type CatSuite struct {
	testingsuite.PopTestSuite
}

func TestCatServiceSuite(t *testing.T) {
	ts := &CatSuite{
		PopTestSuite: testingsuite.NewPopTestSuite(testingsuite.CurrentPackage(), testingsuite.WithPerTestTransaction()),
	}

	suite.Run(t, ts)

	ts.PopTestSuite.TearDown()
}
```

This file sets up our `cat` subpackage to enable
[running tests in transactions](/docs/backend/testing/running-server-tests-inside-a-transaction).

That's it for this step, we'll add more files to the subpackage as we go along the process and fill in the interface
when we start setting up our service objects.