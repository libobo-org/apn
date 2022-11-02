#!/bin/bash
# https://gist.github.com/jpoles1/b677fa078b8c88e6a7721edc5ed46eca
# imagemagick 7 required

icon_path_src=$1;
icon_path_dst=$2;
icon_fav_path_dst=$3;

echo "icon_path_src: $1";
echo "icon_path_dst: $2";
echo "icon_fav_path_dst: $3";

copy() {
  cp "${icon_path_src}" "${icon_path_dst}/${1}"
}

# convert -trim -background none "${icon_path_src}" -resize "${1}x${1}" -gravity center -extent "${1}x${1}" "${icon_path_dst}/${2}"
# convert -trim -background none logo.svg -resize 512x512 -gravity center -extent 512x512 logo2.svg

create() {
  convert -trim \
    -background none \
    "${icon_path_src}" \
    -resize "${1}x${1}" \
    -gravity center \
    -extent "${1}x${1}" \
    "${icon_path_dst}/${2}"
}

mkdir -p "${icon_path_dst}";

copy logo.svg
copy safari-pinned-tab.svg

convert -trim \
  -background none \
  "${icon_path_src}" \
  -gravity center \
  "${icon_path_dst}/logo.png"

convert -trim \
  -background none \
  "${icon_path_src}" \
  -gravity center \
  "${icon_path_dst}/apple-touch-icon.png"

create 192 android-chrome-192x192.png
create 512 android-chrome-512x512.png
create 192 android-chrome-maskable-192x192.png
create 512 android-chrome-maskable-512x512.png
create 60 apple-touch-icon-60x60.png
create 76 apple-touch-icon-76x76.png
create 120 apple-touch-icon-120x120.png
create 152 apple-touch-icon-152x152.png
create 180 apple-touch-icon-180x180.png
create 16 favicon-16x16.png
create 32 favicon-32x32.png
create 144 msapplication-icon-144x144.png
create 150 mstile-150x150.png

convert -trim \
  -background none \
  "${icon_path_src}" \
  -resize 32x32 \
  "${icon_fav_path_dst}"
