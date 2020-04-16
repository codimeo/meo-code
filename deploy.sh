#! /bin/bash

# ##################################################
# MeoStudio and MeoCloud deployment script
#
version="1.0.0"               # Sets version variable
#
# HISTORY:
#
# * DATE - v1.0.0  - First Creation
#
# ##################################################

# Provide a variable with the location of this script.
scriptPath="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Print usage
usage() {
    echo -n "
USAGE:
deploy.sh [--mac-os] meoDestination meoCloudDestination

    --mac-os                Deploy on mac and copy folders under ~/Sites

    Deploy the built folders to their destinations

    meoDestination:         parent folder where meo-studio should be deployed
    meoCloudDestination:    parent folder where meoCloud should be deployed

    Both paths should be mentioned
"
}

# Exit if no arguments
if [ $# -eq 0 ]; then
    usage >&2; exit 0 ;
fi

# build first
npm run build

# meo folder : the first case if when deploy on mac os
if [ $1 == "--mac-os" ]; then
	cp -R ./meo ~/Sites
	cp -R ./meoCloud ~/Sites
	exit 0
else
	if [ -d "$1"/meo ]
	then
		rm -r $1/meo
	fi
	cp -R ./meo "$1"
	chown -R _www:_www $1/meo
fi

# meoCloud folder (if no 2nd argument then use the first destination folder)
if [ -z $2 ]; then
	if [ -d "$1"/meoCloud ]
	then
		rm -r $1/meoCloud
	fi
	cp -R ./meoCloud "$1"
else
	if [ -d "$2"/meoCloud ]
	then
		rm -r $2/meoCloud
	fi
	cp -R ./meoCloud "$2"
fi

exit 0 # Exit cleanly

