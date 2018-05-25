#!/bin/bash
VERSION=1
echo "Generating app.squashfs"

# Check if version is passed, and overwrite
if [[ ! -z "$1" ]]; then
   VERSION=$1
fi

# Make folder bundler with: Empty folder Firmware + version.json
mkdir bundler bundler/Firmware
# Version.json
JSON="{\"version\": $VERSION}"
echo $JSON > bundler/version.json

# Copy Updater folder inside, remove tmp folder
cp -r Updater bundler/
rm -rf bundler/Updater/tmp

# mksquashfs of the content
mksquashfs bundler/ app.$VERSION.squashfs
rm -rf bundler