#!/usr/bin/env bash
TAG=${1?'missing name tag, eg epidemic,nadia,order,epidemic'}
JSON="$TAG"VOICEwin.json
SCRIPT="$TAG".js
sed '/End of parsedData$/,$ d' < base.js > $SCRIPT
cat $JSON >> $SCRIPT
sed '1,/^const parsedData = / d' < base.js >> $SCRIPT
