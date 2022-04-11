#!/bin/sh

if [ ! -d "./node_modules/" ]; then
    echo "Will start the installation of dependencies..."
    npm install
    exit $?
fi

echo "Dependencies already installed!"
exit 0
