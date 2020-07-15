#! /bin/bash

# ##################################################
# MeoStudio and MeoCloud deployment script
#
# Sets version variable
version="1.0.0"
#
# HISTORY:
#
# * DATE - v1.0.0  - First Creation
#
# ##################################################

# @ToDo:
# There is a problem with this script :
# * The created folders under /opt should be as follow:
#   - meo : owned by www-data
#   - meoCloud : owned by nizarayed
# * The issue is that /opt is root blocked. So, extra investigation
#   is required to see how to remove/recreate the above folders w/o
#   the need for root access

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
	sudo cp -R ./meo ~/Sites
	sudo cp -R ./meoCloud ~/Sites
	exit 0
else
	if [ -d "$1"/meo ]
	then
		sudo rm -r $1/meo
	fi
	sudo cp -R ./meo "$1"
	sudo chown -R www-data:www-data $1/meo
fi

# meoCloud folder (if no 2nd argument then use the first destination folder)
if [ -z $2 ]; then
	if [ -d "$1"/meoCloud ]
	then
		sudo rm -r $1/meoCloud
	fi
	sudo cp -R ./meoCloud "$1"
	sudo chown -R nizarayed:nizarayed $1/meoCloud
else
	if [ -d "$2"/meoCloud ]
	then
		sudo rm -r $2/meoCloud
	fi
	sudo cp -R ./meoCloud "$2"
	sudo chown -R nizarayed:nizarayed $2/meoCloud
fi

exit 0 # Exit cleanly

