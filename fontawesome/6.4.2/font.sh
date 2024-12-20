#!/bin/bash

root="https://site-assets.fontawesome.com/releases/v6.4.2/webfonts"
types=("eot" "svg" "ttf" "woff" "woff2")

for type in ${types[@]}; do
    echo download file  $1.$type
    curl $root/$1.$type -o webfonts/$1.$type
done

