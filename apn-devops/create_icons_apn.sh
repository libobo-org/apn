#!/bin/bash

icon_path_src="../apn-frontend/src/assets/logo.svg";
icon_path_dst="../apn-frontend/public/img/icons";
icon_fav_path_dst="../apn-frontend/public/favicon.ico";

bash create_icons_tool.sh ${icon_path_src} ${icon_path_dst} ${icon_fav_path_dst}
