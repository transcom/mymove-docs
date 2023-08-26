---
pagination_next: null
---

# Project Setup: Homebrew vs. Nix

At this point, there are two main ways you can choose to continue setting up your local environment:

- Using `nix` with a bit of `homebrew`
- Using primarily only `homebrew`

Nix and Homebrew are both package managers, but they have different philosophies and approaches to managing software and dependencies.

You can check out the [Nix website](https://nixos.org/) for more information on Nix, but in essence it is a cross-platform package manager that is designed to provide a reproducible and isolated environment for software packages and their dependencies, which allows for easy versioning and rollback of packages.

On the other hand, Homebrew focuses on providing a simple and user-friendly way to install and manage software packages. It doesn't enforce immutability or isolation to the same degree as Nix. Packages are installed to a common location, and the user is responsible for managing dependencies and potential conflicts.

## Which Should I Choose?

Ultimately, it’s up to you!

Nix can be a great option, but it’s notoriously difficult to set up correctly as the [reference manual](https://nixos.org/manual/nix/stable/) is pretty dense, and just as difficult to uninstall if you decide not to use it later. But apparently, if set up correctly, it works *really* well.

Homebrew, being the simpler and probably the more familiar way of managing packages, is a good choice if you want simple and fast installations *now*, at the cost of maybe having to deal with dependency conflicts in the future.

If you want to continue setting up the project using Homebrew, go to [📄 Option 1: Setup Using Homebrew >>](/docs/getting-started/application-setup-new/03-project-setup-homebrew-vs-nix/01-setup-homebrew.md).

If you want to continue setting up the project using Nix, go to [📄 Option 2: Setup Using Nix >>](/docs/getting-started/application-setup-new/03-project-setup-homebrew-vs-nix/02-setup-nix.md).
