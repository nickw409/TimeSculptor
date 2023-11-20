#! /bin/bash

# Run this script to set up a development database. Need to have mysql running.
# While you need to use the password for root in this script a proper user
# is created that you should use for everything afterwards.

WORKING_DIR="$(pwd)"
cd "$(dirname "$0")"
mysql -u root -p < "initDevDB.sql"
cd "${WORKING_DIR}"
npm install
npm run build
npm run api
