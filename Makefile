.PHONY: start
start: .env.local npm-install clean
	docker-compose up -d

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
	@./bin/install-dependencies.sh
