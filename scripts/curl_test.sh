#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-https://YOUR-PROJECT.vercel.app}"
KEY="${2:-REPLACE_WITH_YOUR_LONG_SECRET}"
FILE="${3:-/path/to/10s.wav}"

echo "Ping:"
curl -i "$BASE/api/ping"

echo -e "\nAnalyze:"
curl -i -X POST "$BASE/api/analyze"   -H "x-api-key: $KEY"   -F "file=@${FILE}"
