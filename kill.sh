#! /bin/bash
kill -9 $(cat /opt/meoCloud/logs/nginx.pid)
kill -9 $(cat /run/openresty.pid)
