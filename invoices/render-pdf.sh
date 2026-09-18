#!/bin/sh
# Usage: ./render-pdf.sh 2026-002-client.html  → 2026-002-client.pdf (Letter, one page)
set -e
in="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="${in%.html}.pdf" "file://$in" 2>/dev/null
echo "wrote ${in%.html}.pdf"
