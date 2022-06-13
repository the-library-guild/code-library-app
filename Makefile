.PHONY: start
start: .env.local npm-install clean
	docker-compose up -d

.PHONY: start
rebuild:
	docker-compose build --no-cache

.env.local:
	cp .env.dist .env.local

.PHONY: health-check
health-check:
	@./bin/health-check.sh

.PHONY: clean
clean:
	docker-compose down --remove-orphans

.PHONY: npm-install
npm-install:
	docker compose -f docker-compose.helpers.yml run --rm npm

.PHONY: run-server
run-server:
	docker compose up -d
	cd ../code-library-server && npm start

