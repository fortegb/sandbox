"""Proposta 1 — 'Casa Aberta' (editorial / dossiê). Builds curta + longa PDFs."""
import os
from reportlab.pdfgen import canvas
from pdf_common import (PAGE_W, PAGE_H, hexc, img, img_with_gradient, tinted_image, draw_cover_image,
                         draw_contain_image_top, wrap, draw_paragraph, OUT_DIR, PLATFORM_ROOT)
from content import (TITLE, SUBTITLE, LOCATION, FACTS, SHORT_DESCRIPTION, SHORT_FEATURES,
                      DESCRIPTION_OPENING, DESCRIPTION_SECTIONS, DESTAQUES, DIFERENCIAIS_ENGENHARIA)

COVER_EYEBROW = "CONDOMÍNIO TERRAS DA ESTÂNCIA · PAULÍNIA-SP"
FLOORPLAN_SRC = os.path.join(PLATFORM_ROOT, "public", "images", "floorplans", "casa-jacatia-planta.png")

PAPER = "#eae5db"
INK = "#203045"
ACCENT = "#1a74a1"
MUTED = "#5b6b7d"
FONT_SERIF = "Times-Roman"
FONT_SERIF_B = "Times-Bold"
FONT_SANS = "Helvetica"
FONT_SANS_B = "Helvetica-Bold"

MARGIN = 40
ANCHOR_LINE_Y = 96


def draw_bg(c):
    c.setFillColor(hexc(PAPER))
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)


def draw_cover(c, photo, cover_frac=0.56):
    draw_bg(c)
    cover_h = PAGE_H * cover_frac
    cover_y = PAGE_H - cover_h
    draw_cover_image(c, img_with_gradient(photo), 0, cover_y, PAGE_W, cover_h)
    c.setFillColor(hexc("#cfe0ea"))
    c.setFont(FONT_SANS_B, 8.5)
    c.drawString(MARGIN, cover_y + 96, COVER_EYEBROW)
    c.setFillColor(hexc("#ffffff"))
    c.setFont(FONT_SERIF, 34)
    c.drawString(MARGIN, cover_y + 60, TITLE)
    c.setFillColor(hexc("#dbe6ec"))
    c.setFont(FONT_SANS, 10.5)
    for i, line in enumerate(wrap(c, SUBTITLE, FONT_SANS, 10.5, PAGE_W - 2 * MARGIN - 120)):
        c.drawString(MARGIN, cover_y + 38 - i * 13, line)
    return cover_y


def draw_footer(c, y_top):
    c.setStrokeColor(hexc(INK, alpha=0.25))
    c.setLineWidth(0.75)
    c.line(MARGIN, y_top, PAGE_W - MARGIN, y_top)
    c.setFillColor(hexc(INK))
    c.setFont(FONT_SANS, 8.5)
    c.drawString(MARGIN, y_top - 18, LOCATION)
    c.setFillColor(hexc(MUTED))
    c.setFont(FONT_SANS, 8)
    c.drawString(MARGIN, y_top - 31, "Documentação pronta para financiamento")


def intro_block(c, y, text, photo):
    """Short-version body block: photo + paragraph, no ficha numbering (there is only one)."""
    photo_size = 84
    text_x = MARGIN + photo_size + 16
    text_w = PAGE_W - 2 * MARGIN - photo_size - 16
    c.setFillColor(hexc(ACCENT))
    c.setFont(FONT_SANS_B, 7.5)
    c.drawString(text_x, y, "SOBRE A CASA")
    draw_cover_image(c, img(photo), MARGIN, y - photo_size - 12, photo_size, photo_size)
    ty = draw_paragraph(c, text, text_x, y - 14, text_w, font=FONT_SANS, size=8.3, leading=11.6,
                         color=hexc(INK, alpha=0.82))
    return min(ty, y - photo_size - 12) - 20


def page_footer(c, page_num, total_pages):
    c.setFillColor(hexc(MUTED))
    c.setFont(FONT_SANS, 7)
    c.drawString(MARGIN, 30, "Casa Jacatiá — Condomínio Terras da Estância, Paulínia-SP")
    c.drawRightString(PAGE_W - MARGIN, 30, f"{page_num:02d} / {total_pages:02d}")


def floorplan_page(c, page_num, total_pages):
    """Dedicated page for the floor plan — large, uncropped, right after the cover so the reader
    gets the whole house's layout before the room-by-room walkthrough. Background tinted to match
    the page instead of sitting on a stark white rectangle."""
    draw_bg(c)
    content_w = PAGE_W - 2 * MARGIN
    top = PAGE_H - MARGIN - 6

    c.setFillColor(hexc(INK))
    c.setFont(FONT_SERIF_B, 20)
    c.drawString(MARGIN, top - 4, "Planta Baixa")
    c.setFillColor(hexc(MUTED))
    c.setFont(FONT_SANS, 9)
    c.drawString(MARGIN, top - 24, "Pavimento térreo e pavimento superior")

    plan_top = top - 46
    plan_bottom = 60
    draw_contain_image_top(c, tinted_image(FLOORPLAN_SRC, paper_hex=PAPER), MARGIN, plan_top, content_w,
                            plan_top - plan_bottom)

    page_footer(c, page_num, total_pages)


def draw_mosaic(c, x, top_y, w, max_h, photos):
    """Fill a w x max_h area with 1-3 uncropped photos, top-anchored right under the text so any
    leftover space collects at the page bottom. Returns a list of (cell_x, cell_w, bottom_y) —
    the actual footprint of each cell, used afterwards to place the anchor line only where a real
    gap exists (never guessing based on paint order)."""
    gap = 8
    cells = []
    if len(photos) == 1:
        _, ph = draw_contain_image_top(c, img(photos[0]), x, top_y, w, max_h)
        cells.append((x, w, top_y - ph))
    elif len(photos) == 2:
        cell_w = (w - gap) / 2
        _, h0 = draw_contain_image_top(c, img(photos[0]), x, top_y, cell_w, max_h)
        cells.append((x, cell_w, top_y - h0))
        _, h1 = draw_contain_image_top(c, img(photos[1]), x + cell_w + gap, top_y, cell_w, max_h)
        cells.append((x + cell_w + gap, cell_w, top_y - h1))
    else:
        big_w = (w - gap) * 0.6
        small_w = (w - gap) * 0.4
        small_max_h = (max_h - gap) / 2
        _, hb = draw_contain_image_top(c, img(photos[0]), x, top_y, big_w, max_h)
        cells.append((x, big_w, top_y - hb))
        sx = x + big_w + gap
        draw_contain_image_top(c, img(photos[1]), sx, top_y, small_w, small_max_h)
        _, h2 = draw_contain_image_top(c, img(photos[2]), sx, top_y - small_max_h - gap, small_w, small_max_h)
        cells.append((sx, small_w, top_y - small_max_h - gap - h2))
    return cells


def draw_anchor_line(c, cells):
    """A horizontal line at a fixed height, drawn ONLY in the x-ranges where the mosaic cell's
    photo actually ends above that height — i.e. only where there's a genuine gap. Never overlaps
    a photo, regardless of paint order."""
    c.setStrokeColor(hexc(INK, alpha=0.15))
    c.setLineWidth(0.75)
    for cell_x, cell_w, bottom_y in cells:
        if bottom_y > ANCHOR_LINE_Y + 4:
            c.line(cell_x, ANCHOR_LINE_Y, cell_x + cell_w, ANCHOR_LINE_Y)


def ficha_page(c, heading, photo, text, page_num, total_pages, secondary_photos=None):
    """One ficha per page: heading + full paragraph at the top, then a photo mosaic filling the
    rest of the page — every photo shown whole, nothing cropped."""
    draw_bg(c)
    content_w = PAGE_W - 2 * MARGIN
    top = PAGE_H - MARGIN - 6

    c.setFillColor(hexc(INK))
    c.setFont(FONT_SERIF_B, 20)
    c.drawString(MARGIN, top - 4, heading)
    text_bottom = draw_paragraph(c, text, MARGIN, top - 30, content_w, font=FONT_SANS, size=10,
                                  leading=14.5, color=hexc(INK, alpha=0.85))

    mosaic_top = text_bottom - 16
    mosaic_bottom = 60
    photos = [photo] + list(secondary_photos or [])
    cells = draw_mosaic(c, MARGIN, mosaic_top, content_w, mosaic_top - mosaic_bottom, photos)
    draw_anchor_line(c, cells)

    page_footer(c, page_num, total_pages)


def facts_row(c, y, facts):
    c.setFont(FONT_SANS, 7.8)
    x = MARGIN
    for f in facts:
        c.setFillColor(hexc(ACCENT))
        c.circle(x + 1.5, y - 2.5, 1.5, stroke=0, fill=1)
        c.setFillColor(hexc(INK, alpha=0.75))
        c.drawString(x + 8, y - 6, f)
        x += c.stringWidth(f, FONT_SANS, 7.8) + 26
    return y - 20


def features_grid(c, y, items, cols=2, size=7.6, leading=10.5, bullet_gap=5, col_gap=16):
    """Two independent column stacks, each item taking exactly as many lines as it needs."""
    col_w = (PAGE_W - 2 * MARGIN - (cols - 1) * col_gap) / cols
    per_col = -(-len(items) // cols)
    columns = [items[i * per_col:(i + 1) * per_col] for i in range(cols)]
    bottoms = []
    for ci, col_items in enumerate(columns):
        x = MARGIN + ci * (col_w + col_gap)
        cy = y
        for item in col_items:
            lines = wrap(c, item, FONT_SANS, size, col_w - 12)
            c.setFillColor(hexc(ACCENT))
            c.setFont(FONT_SANS_B, size)
            c.drawString(x, cy, "—")
            c.setFillColor(hexc(INK, alpha=0.85))
            c.setFont(FONT_SANS, size)
            for li, line in enumerate(lines):
                c.drawString(x + 10, cy - li * leading, line)
            cy -= leading * len(lines) + bullet_gap
        bottoms.append(cy)
    return min(bottoms) - 10


def build_curta():
    path = os.path.join(OUT_DIR, "casa-jacatia-proposta1-curta.pdf")
    c = canvas.Canvas(path, pagesize=(PAGE_W, PAGE_H))
    cover_y = draw_cover(c, "fachada-01.jpg", cover_frac=0.50)
    y = cover_y - 26
    y = intro_block(c, y, SHORT_DESCRIPTION, "area-gourmet-01.jpg")
    y = facts_row(c, y + 8, FACTS)
    y -= 6
    c.setFillColor(hexc(INK))
    c.setFont(FONT_SERIF_B, 10.5)
    c.drawString(MARGIN, y, "Destaques")
    y -= 16
    y = features_grid(c, y, SHORT_FEATURES)
    draw_footer(c, 66)
    c.showPage()
    c.save()
    print("wrote", path)


def build_longa():
    path = os.path.join(OUT_DIR, "casa-jacatia-proposta1-longa.pdf")
    c = canvas.Canvas(path, pagesize=(PAGE_W, PAGE_H))
    total_pages = 3 + len(DESCRIPTION_SECTIONS)  # cover + floor plan + one page per ficha + closing page

    # Page 1 — cover + opening
    cover_y = draw_cover(c, "fachada-01.jpg", cover_frac=0.58)
    y = cover_y - 30
    c.setFillColor(hexc(ACCENT))
    c.setFont(FONT_SANS_B, 7.5)
    c.drawString(MARGIN, y, "DOSSIÊ COMPLETO")
    y -= 18
    y = draw_paragraph(c, DESCRIPTION_OPENING, MARGIN, y, PAGE_W - 2 * MARGIN, font=FONT_SERIF, size=11,
                        leading=16, color=hexc(INK))
    y -= 10
    facts_row(c, y, FACTS)
    c.showPage()

    # Page 2 — floor plan, before the room-by-room walkthrough
    floorplan_page(c, page_num=2, total_pages=total_pages)
    c.showPage()

    # One full page per ficha, each with a large photo mosaic
    for i, (heading, photo, text, secondary) in enumerate(DESCRIPTION_SECTIONS):
        ficha_page(c, heading, photo, text, page_num=i + 3, total_pages=total_pages, secondary_photos=secondary)
        c.showPage()

    # Closing page — Destaques + Diferenciais de Engenharia
    draw_bg(c)
    y = PAGE_H - MARGIN - 10
    c.setFillColor(hexc(ACCENT))
    c.setFont(FONT_SANS_B, 7.5)
    c.drawString(MARGIN, y, "CARACTERÍSTICAS")
    y -= 16
    c.setFillColor(hexc(INK))
    c.setFont(FONT_SERIF_B, 12.5)
    c.drawString(MARGIN, y, "Destaques")
    y -= 18
    y = features_grid(c, y, DESTAQUES, size=7.4, leading=13)

    y -= 8
    c.setFillColor(hexc(INK))
    c.setFont(FONT_SERIF_B, 12.5)
    c.drawString(MARGIN, y, "Diferenciais de Engenharia")
    y -= 18
    y = features_grid(c, y, DIFERENCIAIS_ENGENHARIA, size=7.4, leading=13)

    draw_footer(c, 66)
    c.showPage()
    c.save()
    print("wrote", path)


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    build_curta()
    build_longa()
