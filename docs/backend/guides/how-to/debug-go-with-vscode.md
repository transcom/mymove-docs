# How to Debug Go in VSCode

This guide will illustrate how to debug Go code in the MyMove repo with VSCode with the help of the VSCode Go extension. You can find more information about using the Go extension [here](https://github.com/golang/vscode-go/blob/master/docs/debugging.md).

The launch.json file specifies VSCode's debugging configurations. We'll be setting up VSCode to debug both the local server and any single Go test using the following example launch.json

```
{
   "version": "0.2.0",
   "configurations": [
      {
         "name": "Test Current File",
         "type": "go",
         "request": "launch",
         "mode": "test",
         "program": "${relativeFileDirname}",
         "showLog": true
      },
      {
         "name": "Debug Server",
         "type": "go",
         "request": "attach",
         "mode": "local",
         "processId": "milmove_gin"
      }
   ]
}
```

## Debugging a Single Test

When working on a feature or addressing a test failure, it can often be convenient to focus on one test at a time. The following steps will configure VSCode to launch and debug a single Go test.

### Add a launch configuration to your launch.json

Add the "launch" configuration from the example launch.json to your configurations. This config will automatically debug whichever Go test file you have open for editing in VSCode.

```
{
   "name": "Test Current File",
   "type": "go",
   "request": "launch",
   "mode": "test",
   "program": "${relativeFileDirname}",
   "showLog": true
}
```

### Set up your extensions

You'll also need a couple of extensions:

1. The [Go extension](https://marketplace.visualstudio.com/items?itemName=golang.go) from the Go Team at Google
2. A direnv extension so that you have access to the correct environment variables -- [here is one](https://marketplace.visualstudio.com/items?itemName=Rubymaniac.vscode-direnv) that requires that you have direnv already installed. Make sure to use its `direnv allow` command after installing in order to load your environment variables

### Run the test db

Many of the Go tests require the test db to be running, which you can start with  
`make server_test_setup`

### Et voila!

Simply open the Go test file you want to debug and select your "Test Current File" configuration from the "Run and Debug" menu in the sidebar.



## Debugging the Local Server

You can also attach to a running process like the MilMove backend server.

### Add an attach configuration to your launch.json

Add the "attach" configuration from the example launch.json to your configurations. This config will identify a process by its process_id (in this case, the milmove backend server) and attach to it.

```
{
   "name": "Debug Server",
   "type": "go",
   "request": "attach",
   "mode": "local",
   "processId": "milmove_gin"
}
```

### Build the server with debug flags

The server should be built with the flag `-gcflags=all="-N -l"` in order to skip some build optimizations and make debugging easier. You can enable this every time you build the server with Makefile tasks by setting an environment variable:  
`export GOLAND=1`

### Et voila...again!

Run the server and the VSCode debug configuration and put a break point on a familiar handler/endpoint. You should see that the debugger has successfully connected to the process, and you should be able to hit that break point by performing an action or sending a request that corresponds to that handler/endpoint.