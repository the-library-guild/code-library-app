.PHONY: start
start: clean
	docker-compose up -d

.PHONY: init-on-mac
init-on-mac: generate-certificates trust-on-mac start

.PHONY: init-on-linux
init-on-linux: generate-certificates trust-on-linux start

.PHONY: generate-certificates
generate-certificates:
	docker-compose -f docker-compose.certificates.yml run --rm openssl

.PHONY: trust-on-mac
trust-on-mac:
	sudo security add-trusted-cert -d -r trustRoot -k \
    /Library/Keychains/System.keychain docker/openssl/certs/root-ca.pem

.PHONY: trust-on-linux
trust-on-linux:
	sudo cp docker/openssl/certs/root-ca.pem /usr/share/ca-certificates/root-ca.pem \
	&& sudo update-ca-certificates --fresh

.PHONY: clean
clean:
	docker-compose down --remove-orphans
