#!/bin/bash

# Author: Christian Krause<chris@christiankrause.de>

# THIS SCRIPT IS INTENDED TO RUN AS PACKAGE.JSON SCRIPT (VERSION)
# It reads in the current version of package.json
# and replaces CHANGELOG.md first line pattern "### NEXT" with
# "### [2.0.1] 2018-11-26". Also commits CHANGELOG update.

DATE=$(date +%Y-%m-%d)
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

LATEST_CHANGELOG=$(head -n 1 CHANGELOG.md)
NEXT_VERSION="[${PACKAGE_VERSION}] ${DATE}"

# verify CHANGELOG
if echo $LATEST_CHANGELOG | grep -q "NEXT"; then
    # update CHANGELOG - VERSION and DATE
    sed "1s/.*/### ${NEXT_VERSION}/" CHANGELOG.md > /tmp/CHANGELOG && cat /tmp/CHANGELOG > CHANGELOG.md
    # commit (with message)
    git add CHANGELOG.md && git commit -m"CHANGELOG update for tag: ${NEXT_VERSION}"
    echo "✅ CHANGELOG updated for tag: $NEXT_VERSION";
else
    echo "🛂 ERROR: Malformed CHANGELOG. (Expected pattern '### NEXT' found: '$LATEST_CHANGELOG')";
    exit 1 # terminate with error
fi
