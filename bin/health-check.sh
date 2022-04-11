#!/bin/sh

if [ $(curl -LI http://localhost:3000/api/health-check -o /dev/null -w '%{http_code}\n' -s) == "200" ];
    echo "Everything looks fine!"
    then exit 0
fi;

echo "Something went wrong!"
exit 1
