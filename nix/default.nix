let
  pkgs = import <nixpkgs> { };
  inherit (pkgs) buildEnv;
in
buildEnv {
  name = "mymove-docs-packages";
  paths = [
    (import
      (builtins.fetchGit {
        # Descriptive name to make the store path easier to identify
        name = "nodejs-16.15.0";
        url = "https://github.com/NixOS/nixpkgs/";
        ref = "refs/heads/nixpkgs-unstable";
        rev = "0b45cae8a35412e461c13c5037dcdc99c06b7451";
      })
      { }).nodejs-16_x

    (import
      (builtins.fetchGit {
        # Descriptive name to make the store path easier to identify
        name = "yarn-1.22.19";
        url = "https://github.com/NixOS/nixpkgs/";
        ref = "refs/heads/nixpkgs-unstable";
        rev = "e0a42267f73ea52adc061a64650fddc59906fc99";
      })
      { }).yarn
  ];
}
