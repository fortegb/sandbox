# PDF flyer generator (Casa Jacatiá)

Generates the two sales PDFs for Casa Jacatiá — a one-page short flyer and a multi-page long
dossiê — from the same photos and copy used on the live site. Output goes to
`casa-assets/casa03/pdfs/` (assumes `platform` and `casa-assets` are cloned as sibling
directories, e.g. both under `~/Documents/GitHub/fortegb/`).

Python, not Node — deliberately. `reportlab` (PDF canvas drawing) and `Pillow` (per-pixel image
compositing for the gradient/tint effects) are the right tools for the fine-grained layout this
needs; porting to `pdfkit`/`sharp` would be a rewrite, not a port. The dependency stays isolated
in its own venv and never touches `platform`'s own `package.json`/`node_modules`.

## Setup

```bash
cd scripts/pdf-flyer
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
source .venv/bin/activate
python3 build_proposta1.py
```

Writes `casa-jacatia-proposta1-curta.pdf` and `casa-jacatia-proposta1-longa.pdf` to
`casa-assets/casa03/pdfs/`.

## Updating content

- **Copy** (título, subtítulo, descrições, características) lives in `content.py` — currently a
  **manual mirror** of the Casa Jacatiá entry in `platform/data/mock.ts`. If you edit the site's
  copy, `content.py` does not update itself; port the change by hand or the PDFs will silently
  drift out of sync with the live site.
- **Photos** — each ficha section in `content.py`'s `DESCRIPTION_SECTIONS` names a hero photo and
  an optional list of secondary photos by filename. To swap or add one, drop the file into
  `public/images/casa-jacatia/` (if it isn't already there) and change the filename string. No
  layout code needs to change — `pdf_common.py`'s contain-fit helpers size any photo to its own
  aspect ratio automatically, never cropping it.
- **Floor plan** — `build_proposta1.py`'s `FLOORPLAN_SRC` points at
  `public/images/floorplans/casa-jacatia-planta.png`; its white background is auto-tinted to match
  the page (`pdf_common.tinted_image`).
