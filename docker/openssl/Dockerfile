FROM alpine:latest

WORKDIR /root
VOLUME [ "/root/certs" ]
RUN apk add --update-cache openssl

COPY docker/openssl/config/ssl.conf /root/ssl.conf
COPY docker/openssl/generate-certificate.sh /root/generate-certificate.sh

RUN chmod +x /root/generate-certificate.sh

CMD [ "./generate-certificate.sh" ]
