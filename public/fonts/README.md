# Fonts

## Included (self-hosted)

- **Gentium Book Basic** — `gentium-book-basic-regular.woff2`, `gentium-book-basic-bold.woff2`
- **Gentium Book Plus** — `gentium-book-plus-regular.woff2`, `gentium-book-plus-bold.woff2`

## Nexa Rust Sans (add yourself)

Nexa Rust Sans is a commercial font by [Fontfabric](https://www.fontfabric.com/fonts/nexa-rust/). Purchase and download the webfont pack, then place the files in this folder using these names so the app’s CSS can load them:

- `nexa-rust-sans-regular.woff2` (and optionally `nexa-rust-sans-regular.woff`)
- `nexa-rust-sans-bold.woff2` (and optionally `nexa-rust-sans-bold.woff`)

If your pack uses different filenames, update the `@font-face` rules in `app/app.css` to match.

For the heavily **distressed/weathered** title look (rough edges, speckling), that’s usually **Nexa Rust Handmade** (or a specific Sans style from the full pack). Add a Handmade webfont and a separate `@font-face` in `app/app.css` if you want to use that variant for titles.
