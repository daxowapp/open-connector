#!/bin/sh
set -eu

if [ "$#" -eq 0 ]; then
  set -- serve
fi

case "$1" in
serve)
  shift
  # Railway Infrastructure as Code does not currently expose a pre-deploy
  # command in its service DSL. Keep PostgreSQL startup safe after the legacy
  # railway.toml cutoff by applying the idempotent, advisory-lock-protected
  # migrations before accepting traffic.
  if [ -n "${OOMOL_CONNECT_DATABASE_URL:-}" ]; then
    node scripts/runtime-data.ts migrate
  fi
  exec node src/server/index.ts "$@"
  ;;
migrate)
  shift
  exec node scripts/runtime-data.ts migrate "$@"
  ;;
*)
  exec "$@"
  ;;
esac
