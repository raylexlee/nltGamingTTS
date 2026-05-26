# cd www/data   
grep -oE '\$gameVariables\.setValue\(21,[^)]+\)' Map*.json | grep -oE '[A-Z][a-z],[a-z][a-z],[a-z][a-z]' | cut -c1-2 | sort -u
