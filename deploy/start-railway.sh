#!/bin/sh
set -e

cd /api
uvicorn app.main:app --host 127.0.0.1 --port 8000 &
api_pid=$!
trap 'kill "$api_pid" 2>/dev/null || true' EXIT INT TERM

cd /app
export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"
exec node server.js