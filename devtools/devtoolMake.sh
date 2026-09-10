#!/usr/bin/env bash
TAG=${1?'missing name tag, eg epidemic,nadia,order,epidemic'}
JSON="$TAG"VOICEwin.json
SCRIPT="$TAG".js
cp base.js $SCRIPT
vim -O $SCRIPT $JSON
