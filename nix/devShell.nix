{
  mkShell,
  alejandra,
  nodejs_22,
  cloudflared,
}:
mkShell {
  name = "nwhacks-2025";

  packages = [
    nodejs_22
    alejandra

    cloudflared # we need this to use https on our phones, or else our barcode scanner craps itself
  ];
}
