#!/bin/sh
set -e

cd /api
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 &
api_pid=$!
trap 'kill "$api_pid" 2>/dev/null || true' EXIT INT TERM

ready=0
i=0
while [ "$i" -lt 60 ]; do
  if ! kill -0 "$api_pid" 2>/dev/null; then
    echo "uvicorn exited before becoming ready" >&2
    exit 1
  fi
  if curl -sf http://127.0.0.1:8000/api/health >/dev/null; then
    ready=1
    break
  fi
  i=$((i + 1))
  sleep 0.5
done

if [ "$ready" -ne 1 ]; then
  echo "uvicorn health check timed out" >&2
  exit 1
fi

cd /app
export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"
exec node server.js