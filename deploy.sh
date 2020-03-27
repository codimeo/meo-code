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
deploy.sh meoDestination meoCloudDestination

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

# meo folder : the first case if when deploy on mac os
if [ -z $1 ]; then
	cp -R ./meo ~/Sites
	cp -R ./meoCloud ~/Sites
else
	if [ -d "$1"/meo ]
	then
		rm -r $1/meo
	fi
	cp -R ./meo "$1"
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
