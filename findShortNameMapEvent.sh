# cd www/data   
grep -oE '\$gameVariables\.setValue\(21,[^)]+\)' Map*.json | grep -oE '[A-Z][a-z][A-Z][a-z]\.' | cut -c1-2 | sort -u
