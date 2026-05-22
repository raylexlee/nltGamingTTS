# cd ./www/img/pictures for 'Treasure of Nadia' and 'The Genesis Order'
ls -b CHR*Body-1* | grep -o 'CHR-[A-Z][a-z]*' | sed 's#CHR-\(.*\)#\1 Male#' | sort -u
