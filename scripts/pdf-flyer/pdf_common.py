"""Shared helpers for the Casa Jacatiá flyer PDF builders."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit, ImageReader
from reportlab.lib.colors import Color
from PIL import Image, ImageChops
import os

PAGE_W, PAGE_H = A4

# This script lives at platform/scripts/pdf-flyer/. Paths below are relative to that, so the
# script works on any machine that has `platform` and `casa-assets` cloned as sibling directories
# (the standard layout — see this folder's README).
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PLATFORM_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
FORTEGB_ROOT = os.path.abspath(os.path.join(PLATFORM_ROOT, ".."))

IMG_DIR = os.path.join(PLATFORM_ROOT, "public", "images", "casa-jacatia")
OUT_DIR = os.path.join(FORTEGB_ROOT, "casa-assets", "casa03", "pdfs")
IMAGE_CACHE_DIR = os.path.join(SCRIPT_DIR, "_image_cache")


def hexc(h, alpha=1.0):
    h = h.lstrip("#")
    r, g, b = int(h[0:2], 16) / 255, int(h[2:4], 16) / 255, int(h[4:6], 16) / 255
    return Color(r, g, b, alpha=alpha)


def img(name):
    return ImageReader(os.path.join(IMG_DIR, name))


def img_with_gradient(name, color_hex="#203045", start_frac=0.35, power=1.6):
    """A version of the photo with a vertical dark gradient baked directly into its pixels
    (transparent at start_frac, fully opaque by the bottom). Stacking many semi-transparent PDF
    rectangles to fake this causes visible banding in every renderer tested — real per-pixel
    compositing in PIL doesn't have that problem, so we do it once here and cache the result."""
    os.makedirs(IMAGE_CACHE_DIR, exist_ok=True)
    cache_key = f"{name}__{color_hex.lstrip('#')}_{start_frac}_{power}.jpg"
    out_path = os.path.join(IMAGE_CACHE_DIR, cache_key)
    if not os.path.exists(out_path):
        photo = Image.open(os.path.join(IMG_DIR, name)).convert("RGB")
        w, h = photo.size
        rgb = tuple(int(color_hex.lstrip("#")[i:i + 2], 16) for i in (0, 2, 4))
        overlay = Image.new("RGB", (w, h), rgb)
        grad_col = Image.new("L", (1, h))
        px = grad_col.load()
        for y in range(h):
            frac = y / (h - 1)
            a = max(0.0, (frac - start_frac) / (1 - start_frac))
            a = min(1.0, a) ** power
            px[0, y] = int(a * 255)
        mask = grad_col.resize((w, h))
        Image.composite(overlay, photo, mask).save(out_path, "JPEG", quality=90)
    return ImageReader(out_path)


def tinted_image(src_path, paper_hex="#eae5db", low=228, high=253):
    """A version of a technical drawing (floor plan) with its white/light-gray background blended
    toward the paper color, leaving linework, dimensions, labels, and any colored fills untouched
    — so it reads as part of the page instead of a stark white rectangle sitting on it. A pixel
    only counts as background if ALL of R, G, B are light (min channel above `low`), which is what
    keeps saturated-but-light colors (e.g. the pool's pale blue) from being caught. Cached by
    source path + paper color."""
    os.makedirs(IMAGE_CACHE_DIR, exist_ok=True)
    base = os.path.splitext(os.path.basename(src_path))[0]
    out_path = os.path.join(IMAGE_CACHE_DIR, f"{base}__tinted_{paper_hex.lstrip('#')}.png")
    if not os.path.exists(out_path):
        photo = Image.open(src_path).convert("RGB")
        r, g, b = photo.split()
        min_rgb = ImageChops.darker(ImageChops.darker(r, g), b)
        lut = [0 if v <= low else 255 if v >= high else int((v - low) / (high - low) * 255) for v in range(256)]
        mask = min_rgb.point(lut)
        paper_rgb = tuple(int(paper_hex.lstrip("#")[i:i + 2], 16) for i in (0, 2, 4))
        paper_img = Image.new("RGB", photo.size, paper_rgb)
        Image.composite(paper_img, photo, mask).save(out_path, "PNG")
    return ImageReader(out_path)


def draw_cover_image(c, reader, x, y, w, h, valign=0.5):
    """Draw an image cropped to cover a w x h box (like CSS object-fit: cover). Only used for the
    atmospheric page-1 cover treatment — content ficha photos use the contain-fit helpers below
    so nothing real ever gets trimmed."""
    iw, ih = reader.getSize()
    box_ratio = w / h
    img_ratio = iw / ih
    c.saveState()
    p = c.beginPath()
    p.rect(x, y, w, h)
    c.clipPath(p, stroke=0)
    if img_ratio > box_ratio:
        new_w = ih * box_ratio
        crop = (iw - new_w) / 2
        scale = h / ih
        c.drawImage(reader, x - crop * scale, y, iw * scale, ih * scale, mask="auto")
    else:
        new_h = iw / box_ratio
        total_crop = ih - new_h
        crop_below = total_crop * (1 - valign)
        scale = w / iw
        c.drawImage(reader, x, y - crop_below * scale, iw * scale, ih * scale, mask="auto")
    c.restoreState()


def draw_contain_image_top(c, reader, x, top_y, max_w, max_h):
    """Scale the WHOLE image to fit inside max_w x max_h with no cropping, anchored to the top and
    horizontally centered. Returns (draw_w, draw_h) actually used, so leftover space collects
    below the image (e.g. at the page bottom) instead of splitting above and below it."""
    iw, ih = reader.getSize()
    scale = min(max_w / iw, max_h / ih)
    draw_w, draw_h = iw * scale, ih * scale
    dx = x + (max_w - draw_w) / 2
    dy = top_y - draw_h
    c.drawImage(reader, dx, dy, draw_w, draw_h, mask="auto")
    return draw_w, draw_h


def wrap(c, text, font, size, max_w):
    c.setFont(font, size)
    return simpleSplit(text, font, size, max_w)


def draw_paragraph(c, text, x, y, max_w, font="Helvetica", size=9, leading=13, color=None, align="left"):
    """Draw wrapped text top-down starting at y (y is the TOP of the first line). Returns new y after."""
    if color:
        c.setFillColor(color)
    lines = wrap(c, text, font, size, max_w)
    c.setFont(font, size)
    cy = y
    for line in lines:
        if align == "left":
            c.drawString(x, cy - size, line)
        elif align == "center":
            c.drawCentredString(x + max_w / 2, cy - size, line)
        cy -= leading
    return cy


