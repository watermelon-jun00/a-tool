#!/bin/zsh

cd "$(dirname "$0")" || exit 1

URL="http://127.0.0.1:5500/index.html"

echo "Local site:"
echo "$URL"
echo

PORT_STATUS=$(python3 - <<'PY'
import socket
import urllib.request

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    sock.settimeout(0.25)
    if sock.connect_ex(("127.0.0.1", 5500)) != 0:
        print("free")
        raise SystemExit(0)

try:
    with urllib.request.urlopen("http://127.0.0.1:5500/index.html", timeout=1) as response:
        body = response.read(200000)
except Exception:
    print("occupied")
    raise SystemExit(0)

if b"summaryGrid" in body and b"app.js?v=" in body:
    print("site")
else:
    print("occupied")
PY
)

if [ "$PORT_STATUS" = "site" ]; then
  echo "Port 5500 is already serving this site. Open the URL above in your browser."
  echo "If the page looks stale, hard refresh the browser once."
  exit 0
fi

if [ "$PORT_STATUS" = "occupied" ]; then
  echo "Port 5500 is already in use, but it does not look like this site."
  echo "Close the other local server, or open index.html directly with file://."
  exit 1
fi

echo "Starting local server on 127.0.0.1:5500"
echo "Keep this window open while you use the page."
echo "Press Control-C here to stop the local server."
echo

python3 -m http.server 5500 --bind 127.0.0.1
