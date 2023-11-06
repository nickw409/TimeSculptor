#! /bin/bash

# Run this script to set up a development database. Need to have mysql running.
# While you need to sue the password for root in this script a proper user
# is created that you should use for everything afterwards.

mysql -u root -p <initDevDB.sql
