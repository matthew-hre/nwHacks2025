{
  mkShell,
  alejandra,
  nodejs_22,
}:
mkShell {
  name = "nwhacks-2025";

  packages = [
    nodejs_22
    alejandra
  ];
}
