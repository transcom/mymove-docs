let
  pkgs = import <nixpkgs> {};
  inherit (pkgs) buildEnv;
in buildEnv {
  name = "mymove-docs-packages";
  paths = [
    (import (builtins.fetchGit {
      # Descriptive name to make the store path easier to identify
      name = "nodejs-14.18.3";
      url = "https://github.com/NixOS/nixpkgs/";
      ref = "refs/heads/nixpkgs-unstable";
      rev = "847a715cfa7ed92cff06a780ec684e26388498e1";
    }) {}).nodejs-14_x

    (import (builtins.fetchGit {
      # Descriptive name to make the store path easier to identify
      name = "yarn-1.22.17";
      url = "https://github.com/NixOS/nixpkgs/";
      ref = "refs/heads/nixpkgs-unstable";
      rev = "c11d08f02390aab49e7c22e6d0ea9b176394d961";
    }) {}).yarn
  ];
}
