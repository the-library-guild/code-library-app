#!/bin/sh

if [ $(curl -LI http://localhost:3000/api/health-check -o /dev/null -w '%{http_code}\n' -s) == "200" ];
    then exit 0;
fi;

exit 1
