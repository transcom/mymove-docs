# How to Create a Custom Go Linter

Creating custom GO linters can be a great way to analyze your 
project's source code and alert you to bugs, errors, 
or other issues with your code.

## Setting up your linter

### File structure
Start by setting up the files you'll need for your linter:
```golang
-cmd
    -linter_name
        -main.go

-pkg
    -linter_name
        -linter.go
        -linter_test.go
```
In the `cmd` folder create a folder for your linter called `<linter_name>` and add an empty file called `main.go`

In `pkg` folder create another folder for your linter called `<linter_name>` and in it you will 
have your `linter.go` and `linter_test.go`
### Analyzer:
In the `cmd` folder contains the the analysis driver for your linter. The file `main.go` will utilize a package called `singlechecker`,
which defines the main function for an analysis driver and provides a tool to run a standalone analysis.

The code in `main.go` is very simple:

```golang
package main

import (
	"example.org/linter_name"
	"golang.org/x/tools/go/analysis/singlechecker"
)

func main() { singlechecker.Main(linter_name.LinterAnalyzer) }
```

### Creating a linter
The linter will live in the `pkg` folder, in a folder named after your linter. 
In `linter.go` you will store the linter analyzer that gets referenced in `cmd/linter_name/main.go`. 
It will contain the name of the liner, documentation about the linter, a call to runthe linter, and requirements:

```golang
var LinterAnalyzer = &analysis.Analyzer{
	Name:     "linternamelint",
	Doc:      "Make sure X object is properly used throughout codebase",
	Run:      run,
	Requires: []*analysis.Analyzer{inspect.Analyzer},
}
```

Note that `Run` expects an interface and runs your linter code. This value can be the function that executes your linter. In this example, we are calling teh function `run`:

```golang
func run(pass *analysis.Pass) (interface{}, error) {
    // Some code
}
```

The linter is actually analyzing an abstract syntax tree, AST, that represents code in a file. 
When your linter gets to a position in a file, where it catches an error, bug, or issue, it will flag this for the user.
Because the linter is analyzing an AST, your code must be able to search through a file and mark which position it is when an issue is caught.

A great resource to use to learn how to write code for analyzing an AST can be found [here](https://disaev.me/p/writing-useful-go-analysis-linter/).
If you're curious about what an AST looks like for your program, checkout [this](http://goast.yuroyoro.net/) online visualizer.

### Writing linter tests
Linter tests also do not look liek your typical go tests. They function with want statements.

You will still create tests that test the happy and unhappy paths of your code. However, rather than your typical expect
statement, you will instead put a want statement as a comment next to where you expect your linter to flag an issue:

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

## Testing linter across files

To run your linter across files run this command in your terminal:
`go run ./cmd/example-linter/main.go -- ./...`

The `-- ./...` flag tells the linter to run against __all__ files.

To run the linter tests only:
`go test ./pkg/example-linter/... -v`

## Running your linter in pre-commit
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

### Additional Resources:
* [Debugging custom Go linters](https://dp3.atlassian.net/wiki/spaces/~721089227/pages/1531150353/Debugging+custom+Golang+linters)
* [Using go/analysis to write a custom linter](https://arslan.io/2019/06/13/using-go-analysis-to-write-a-custom-linter/)
  * Provides more details on the GO/Analysis API
* [AST documentation](https://pkg.go.dev/go/ast)
