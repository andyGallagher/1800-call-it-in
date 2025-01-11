#!/usr/bin/env bash

# TODO => Convert this to node script

# Don't `set -e -o pipefail`, because `pg_ctl status` command exits 3 when the server isn't running,
# and 4 when the data directory doesn't exist.
set -u


COMMAND="${1:-help}"
ARGS=($@)

echo "=> Loading .env file";
set -o allexport; source "../.env"; set +o allexport

# Disable this script anywhere but local---except the `local-shell` command.
if [ "$ENV" != "local" ] && [ "$COMMAND" != "local-shell" ]; then
  echo "The db script is only intended for local development".
  echo "Found ENV='$ENV'."
  exit 1
fi

# Resolve paths relative to server directory.
RESOLVED_DIR="../../$DATABASE_DIR"
STASH_DIR="../../$DATABASE_DIR.stash"
DATA_DIR="$RESOLVED_DIR/db"
LOG_FILE="$RESOLVED_DIR/postgres.log"

function init_command {
  echo "=> Initializing postgres database";
  pg_ctl init -D "$DATA_DIR"

  # Start the DB.
  echo
  start_command

  echo; echo "=> Creating database $DATABASE_NAME";
  createdb "$DATABASE_NAME"

  # Prisma user needs to be able to createdb.
  echo; echo "=> Creating user $DATABASE_USER with password from .env ${DATABASE_PASSWORD}";
  psql -d "$DATABASE_NAME" -c "CREATE USER $DATABASE_USER WITH PASSWORD '$DATABASE_PASSWORD' CREATEDB"
  psql -d "$DATABASE_NAME" -c "GRANT ALL PRIVILEGES ON DATABASE $DATABASE_NAME TO $DATABASE_USER"
}

function confirm() {
  MESSAGE="$1"
  echo
  read -p "${MESSAGE} Continue? (N/y): " -n 1 -r
  if [[ ! $REPLY =~ ^[Yy]$ ]]
  then
    echo
    echo "=> Canceled"
    exit 1
  fi
  echo
}

function local_shell_command {
  echo "=> Opening shell"
  psql -d "$DATABASE_NAME"
}

function start_command {
  output=$(status_command)
  status=$?
  case $status in
    3)
      echo "=> Starting database"
      pg_ctl -o "-p $DATABASE_PORT" -D "$DATA_DIR" -l "$LOG_FILE" start
      ;;
    0)
      echo "=> Database already running"
      ;;
    *)
      echo "=> Error"
      echo "$output"
      exit 1
      ;;
  esac
}

function stash_command {
  stash_init

  SUBCOMMAND=${ARGS[1]:-""}

  case "$SUBCOMMAND" in
    "help")
      stash_help_command
      ;;
    "list")
      stash_list_command
      ;;
    "pop")
      stash_pop_command
      ;;
    "apply")
      stash_apply_command
      ;;
    "drop")
      stash_drop_command
      ;;
    *)
      STASH_NAME=${SUBCOMMAND}
      stash_push_command $STASH_NAME
  esac
}

function stash_help_command {
  echo "DB stashes"
  echo
  echo "Subcommands:"
  echo "  list: List all stashes."
  echo "  apply: Apply a stash; does not remove it."
  echo "  drop: Remove a stash."
  echo "  pop: Apply a stash and then remove it."
  echo "  <name>: Stash the current database as <name>."
  echo
  exit 1
}

function stash_list_command {
  echo; echo "DB stashes:"
  stash_init
  ls ${STASH_DIR}
}

function stash_init {
  mkdir -p ${STASH_DIR}
}

function get_stash_name {
  STASH_NAME=${ARGS[2]:-""}

  if [ ! -d "${STASH_DIR}/${STASH_NAME}" ]; then
    echo "=> No stash named ${STASH_NAME}" >&2
    exit 1
  fi

  echo $STASH_NAME
}

function stash_apply_command {
  STASH_NAME=$(get_stash_name) || exit

  confirm "=> This will destroy your current database and restore the stashed db \"${STASH_NAME}\"" || exit

  stop_command
  rm -rf "${RESOLVED_DIR}"
  cp -R "${STASH_DIR}/${STASH_NAME}" "$RESOLVED_DIR"
  start_command
}

function stash_drop_command {
  STASH_NAME=$(get_stash_name) || exit

  confirm "=> This will drop the stashed db \"${STASH_NAME}\"" || exit

  rm -rf "${STASH_DIR}/${STASH_NAME}"
}

function stash_pop_command {
  stash_apply_command
  stash_drop_command
}


function stash_push_command() {
  STASH_NAME="$1"

  if [ -z $STASH_NAME ]
  then
    echo
    read -p "=> What do you want to call your db stash (must be a valid directory name):" -r STASH_NAME
  fi

  re='^[A-Za-z0-9_-]+$'
  if [[ ! $STASH_NAME =~ $re ]]
  then
    echo
    echo "Invalid stash name: ${STASH_NAME}"
    exit 1
  fi

  stop_command
  echo; echo "=> Stashing database"
  cp -r "$RESOLVED_DIR" "$STASH_DIR/$STASH_NAME"
  start_command
}

function stop_command {
  output=$(status_command) 2>&1
  status=$?
  case $status in
    3)
      echo "=> Database not running"
      ;;
    4)
      echo "=> Database not running; no data directory"
      ;;
    0)
      echo "=> Stopping database";
      pg_ctl -D "$DATA_DIR" stop
      ;;
    *)
      echo "=> Error (${status})"
      echo "$output"
      exit 1
      ;;
  esac
}

function status_command {
  pg_ctl -D "$DATA_DIR" status
}

function destroy_command {
  stop_command

  echo; echo "=> Destroying database $DATABASE_DIR";
  confirm "=> This will execute 'rm -rf $RESOLVED_DIR'" || exit

  rm -rf "$RESOLVED_DIR"
  echo "=> Database destroyed"
}

function reset_command {
  stop_command
  destroy_command
  init_command
}

case "$COMMAND" in
  "init")
    init_command
    echo "=> Ready"
    ;;
  "start")
    start_command
    echo "=> Ready"
    ;;
  "stash")
    stash_command
    ;;
  "stop")
    stop_command
    ;;
  "status")
    status_command
    ;;
  "local-shell")
    local_shell_command
    ;;
  "destroy")
    destroy_command
    ;;
  "reset")
    reset_command
    echo "=> Ready"
    ;;
  *)
    echo "Supported commands: init | start | stash | stop | status | local-shell | destroy | reset"
    exit 1
    ;;
esac
