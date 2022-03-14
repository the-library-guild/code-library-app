#!/bin/sh

ROOT_PASSWORD=root
NAME=codelibrary.dev

if [ "$(ls /root/certs)" ]; then
    echo "Self signed certificates already exist"
    exit 0
fi

cd /root/certs

# generate root-CA
openssl genrsa -des3 -passout pass:${ROOT_PASSWORD} -out root-ca.key 2048
openssl req -x509 -new -nodes -passin pass:${ROOT_PASSWORD} -key root-ca.key -sha256 -days 397 -out root-ca.pem -subj "/C=DE/ST=GERMANY/L=BERLIN/O=${ROOT_PASSWORD}/OU=DEV/CN=${NAME}"

# generate cert
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/C=DE/ST=GERMANY/L=BERLIN/O=${ROOT_PASSWORD}/OU=DEV/CN=${NAME}"
openssl x509 -req -in server.csr -extfile /root/ssl.conf -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -passin pass:${ROOT_PASSWORD} -out server.crt -days 397 -extensions v3_req

chown -R 1000:1000 /root/certs
chmod -R 700 /root/certs
