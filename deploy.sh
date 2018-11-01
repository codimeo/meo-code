#! /bin/bash

if [ -z $1 ]; then
	cp -R ./meo ~/Sites
else
	if [ -d "$1"/meo ]
	then
		rm -r $1/meo
	fi
	cp -R ./meo "$1"
fi

