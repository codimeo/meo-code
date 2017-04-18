#! /bin/bash

if [ -z $1 ]; then
	cp -R ./meo ~/Sites
else
	cp -R ./meo "$1"
fi
