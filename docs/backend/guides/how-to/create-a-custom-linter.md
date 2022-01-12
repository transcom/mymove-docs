# How to Create a Custom Go Linter

Creating custom GO linters can be a great way to analyze your
project's source code and alert you to bugs, errors,
or other issues with your code.

## Setting up your linter

### File structure
Start by setting up the files you'll need for your linter:
```golang
-cmd
    -example_linter_name
        -main.go

-pkg
    -example_linter_name
        -example_linter.go
        -example_linter_test.go
```
In the `cmd` folder create a folder for your linter called `<example_linter_name>` and add an empty file called `main.go`

In `pkg` folder create another folder for your linter called `<example_linter_name>` and in it you will
place your `example_linter.go` and `example_linter_test.go`

### Analyzer:
The `cmd` folder contains the analysis driver for your linter. The file `main.go` will utilize a package called `singlechecker`,
which defines the main function for an analysis driver and provides a tool to run a standalone analysis.

The code in `main.go` is:

```golang
package main

import (
	"golang.org/x/tools/go/analysis/singlechecker"

	examplelinter "github.com/transcom/mymove/pkg/example-linter"
)

func main() { singlechecker.Main(examplelinter.LinterAnalyzer) }
```

### Creating a linter
The linter will live in the `pkg` folder, in a folder named after your linter.
In `example_linter.go` you will store the linter analyzer that gets referenced in `cmd/example_linter_name/main.go`.
It will contain the name of the liner, documentation about the linter, a call to run the linter, and requirements:

```golang
var LinterAnalyzer = &analysis.Analyzer{
	Name:     "linternamelint",
	Doc:      "Make sure X object is properly used throughout codebase",
	Run:      run,
	Requires: []*analysis.Analyzer{inspect.Analyzer},
}
```

Note that `Run` expects an interface and runs your linter code. This value can be the function that executes your linter. In this example, we are calling the function `run`:

```golang
func run(pass *analysis.Pass) (interface{}, error) {
    // Some code
}
```

The linter is analyzing an abstract syntax tree, AST, that represents code in a file.
When your linter gets to a position in a file, where it catches an error, bug, or issue, it will flag this for the user.
Because the linter is analyzing an AST, your code must be able to search through a file and mark the position where the issue is caught.
To do this, you will mark the position in the file with a `.Pos()` method. Then the position of the object will be passed to `pass.Reportf`, where the linter message will be set as a second parameter:

```golang
    if paramsIncludeYInStruct {
        pass.Reportf(decl.Pos(), "Please use x.Something instead of y.Something.")
    }
```

There are great [online resources](http://goast.yuroyoro.net/) that you can use to visualize ASTs.
While these are great to use to [learn how to write code to search through an AST](https://disaev.me/p/writing-useful-go-analysis-linter/),
there may still be differences in what you see when working with your linter.

## Testing:

### Writing linter tests
Linter tests also do not look like your typical go tests. They function with want statements.

You will still create tests that test the happy and unhappy paths of your code. However, rather than your typical `expect`
statement, you will instead put a `want` statement as a comment next to where you expect your linter to flag an issue:

```golang
package examplelinter

import (
	"os"
	"path/filepath"
	"testing"

	"golang.org/x/tools/go/analysis/analysistest"
)

// this test starts up Test runner and looks at tests in example_linter_tests and runs linter against those files
// if there are no want statements, the linter moves on to the next statement
// if there are no want statements and the test fails, our linter is failing because nothing is expected.
func TestAll(t *testing.T) {
	wd, err := os.Getwd()
	if err != nil {
		t.Errorf("Failed to get wd: %s", err)
	}

	testdata := filepath.Join(filepath.Dir(filepath.Dir(wd)), "testdata")

	// Pass in the linter that we want to use, and location of linter tests:
	analysistest.Run(t, testdata, LinterAnalyzer, "example_linter_tests/...")
}
```

### Utilizing test data
Your linter's functionality may require you to use test data. In the mymove repo there is a folder called `testdata` for this purpose. You can utilize test data for
`App Context`, `Handlers`, the `Database`, etc., or you can create your own test data folder, as was done with the `Ato Linter`. To create your own test data, create a folder in `testdata/src` called `example_linter_tests`.
In the new folder you created you can add files with data that you want your linter to run against or check:

```golang
package example_linter_tests

// Test X is in the struct
type TestExampleStruct struct {
	X         *x.Something // Look for the Something type
	testString string
}

// TestHandler Test y is in struct and raise error if it is.
type TestExampleStructWithY struct { // want "Please remove y.Something from the struct if not in allowed places. See pkg/example_linter/example_linter.go for valid placements."
	Y         *y.Something
	testString string
}

// Test X is a parameter in a function
func TestFuncWithPopConnection(x *x.Something) {}
```
In the above example, there is a `want` statement that will trigger the linter to flag an unwanted object in the struct.

The `testdata` will then be passed into the `Run` as a parameter as noted above
in the sample linter test: `analysistest.Run(t, testdata, LinterAnalyzer,
"example_linter_tests/...")`

### Testing the linter across files

To run your linter across files run this command in your terminal:
`go run ./cmd/example-linter/main.go -- ./...`

The `-- ./...` flag tells the linter to run against __all__ files.

To run the linter tests only:
`go test ./pkg/example-linter/... -v`



## Running the linter in pre-commit
Depending on the function of your linter, you may want to add it to precommit. You will do this by adding a new definition to precommit:
```golang
  - repo: local
    hooks:
      - id: example-linter
        name: example-linter
        entry: scripts/pre-commit-go-custom-linter example-linter
        files: \.go$
        pass_filenames: false
        language: script
```

Note that the `language` key refers to a bash script, that is because we have had the most success with
creating a custom bash script (located in the `script` folder) for running all custom linters in precommit.

You can checkout this custom bash script at `scripts/pre-commit-go-custom-linter`.

## Additional Resources:
* [Debugging custom Go linters](https://dp3.atlassian.net/wiki/spaces/~721089227/pages/1531150353/Debugging+custom+Golang+linters)
* [Using go/analysis to write a custom linter](https://arslan.io/2019/06/13/using-go-analysis-to-write-a-custom-linter/)
  * Provides more details on the GO/Analysis API
* [AST documentation](https://pkg.go.dev/go/ast)
* [Custom AppContext Linter in mymove Repo](https://github.com/transcom/mymove/tree/d8d2b3862a28b344a1afdbb1a781d6529f04feb8/pkg/appcontext-linter)
