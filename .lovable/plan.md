## Goal
On the jersey detail page, show the full jersey photo — no cropping — matching the homepage grid fix.

## Changes
Single file: `src/routes/jerseys/$jerseyId.tsx`.

1. **Main image (line 140)**: change `aspect-[3/4] object-cover bg-vault-surface` → `aspect-square object-contain bg-neutral-200`. Square frame + contain means the whole jersey fits with light gray padding, matching the homepage cards.
2. **Thumbnails (line 196)**: change `object-cover` → `object-contain`, and swap the thumbnail button background from `bg-vault-surface` (line 186) to `bg-neutral-200` so the thumb previews match the main image.

## Result
- Every jersey (Ness, Knierim, Crotty, etc.) shows fully on the detail page inside a light-gray square, same look as the homepage grid.
- Thumbnails mirror the same treatment.

## Out of scope
Homepage grid (already done), hero, filters, data edits.
