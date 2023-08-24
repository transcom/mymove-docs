# Makefile

The primary way to interact with the project is via the `Makefile`. The `Makefile` contains a number of handy
targets (you can think of these as commands) that make interacting with the project easier. Each target manages
its own dependencies so that you don't have to. This is how you'll do common tasks like build the project, run
the server and client, and manage the database.

The fastest way to get familiar with the `Makefile` is to use the command `make help`. You can also type `make`
and it will default to calling `make help` target on your behalf. The `Makefile` is important to this project
so take the time to understand what it does.
