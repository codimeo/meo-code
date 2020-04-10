#! /bin/bash
# Use only on codimeo.com server
kill -9 $(cat /opt/meoCloud/logs/nginx.pid)
kill -9 $(cat /run/openresty.pid)
