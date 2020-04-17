# MeoStudio

MeoStudio aims to become the world's most proficient Visual Coding environment

# Getting Started

There are two components:
- MeoStudio:    https://meo.codimeo.com
- MeoCloud:     accessible via MeoStudio to store users' projects

# Documentation

## MeoStudio

## MeoCloud

### General
The configuration is found in config.lua. Do not change the file but do the following:
- Create .env file under MeoCloud root folder
```
$ nano .env
```
- Export in .env all the required parameters

Here is an example of .env :
```
export LAPIS_ENVIRONMENT=development
export DATABASE_URL=127.0.0.1:5432
export DATABASE_USERNAME=cloud
export DATABASE_PASSWORD=cloud123
export DATABASE_NAME=cloud
export MAIL_SMTP_USER=user@example.com
export MAIL_SMTP_PASSWORD=Password
export MAIL_SMTP_SERVER=smtp01.example.com
export PORT=8080
export DAEMON=off
export PROJECT_STORAGE_PATH=/path/to/store
```

I would advice to keep the server limited to localhost. And, configure the web server, Nginx or Apache, as a reverse proxy.

### Recommendation

It is recommended to keep the store outside the meoCloud folder. That way, it can be deleted and refreshed with upgrades without caring about 
the stored users' data.

## Release History
v1.0    : 6 Apr. 2020

## License
Copyright (c) 2020 Codimeo.com  
Licensed under the MIT license.
