# Company Logos

By default each role shows a **branded monogram badge** (initials in the
company's brand color). To use an official logo instead, drop a file here and
point the entry at it in `src/data/experience.ts`.

## How to add one

1. Save the logo as SVG (preferred) or PNG with a transparent background, e.g.:

   ```
   /public/logos/walmart.svg
   /public/logos/sap.svg
   ```

2. Set the `logo` field on that company in `src/data/experience.ts`:

   ```ts
   { company: 'Walmart', logo: '/logos/walmart.svg', brandColor: '#0071ce', initials: 'W', ... }
   ```

The logo is shown on a small light chip and falls back to the monogram if the
file is missing or fails to load. Get official marks from each company's brand /
press resources.
