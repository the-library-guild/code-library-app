.PHONY: start
start: .env.local clean
	docker-compose up -d

.PHONY: init-on-mac
init-on-mac: generate-certificates trust-on-mac add-localhost-aliases start

.PHONY: init-on-linux
init-on-linux: generate-certificates trust-on-linux add-localhost-aliases start

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

.env.local:
	cp .env.dist .env.local

.PHONY: add-localhost-aliases
add-localhost-aliases:
	echo "127.0.0.1 codelibrary.dev api.codelibrary.dev client.codelibrary.dev" | sudo tee -a /etc/hosts

.PHONY: health-check
health-check:
	sh -c "if [ $(curl -LI http://localhost:3000/api/health-check -o /dev/null -w '%{http_code}\n' -s) == \"200\" ]; then exit 0; fi; exit 1"

.PHONY: clean
clean:
	docker-compose down --remove-orphans

.PHONY: npm_install
npm_install:
	docker-compose exec client npm install $(package) $(flags)
	docker-compose build client
	docker-compose restart
