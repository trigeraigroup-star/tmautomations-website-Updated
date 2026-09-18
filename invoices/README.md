# Invoices

- `template.html` — brand invoice (Barlow Semi Condensed, parchment/teal from the site CSS). Fill the `{{PLACEHOLDERS}}`, save as `YYYY-NNN-client.html` in this folder.
- `./render-pdf.sh YYYY-NNN-client.html` — renders a one-page Letter PDF with headless Chrome.
- Logo: swap the `<h1>Invoice</h1>` for an `<img>` once the logo is decided (see the comment in the template).
- Extra line items: duplicate the `<tr>` in `<tbody>`.
- Sent invoices are kept out of git (see `.gitignore`); only the template is tracked.
