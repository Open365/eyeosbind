#!/bin/bash
set -e
set -u
set -x

npm install
grunt publish-npm
