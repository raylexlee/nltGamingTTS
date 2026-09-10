#!/usr/bin/env bash
TAG=${1?'missing name tag, eg epidemic,nadia,order,epidemic'}
JSON="$TAG"VOICEwin.json
SCRIPT="$TAG".js
cp 1stHALFjs.txt $SCRIPT
cat $JSON >> $SCRIPT
cat 2ndHALFjs.txt >> $SCRIPT
