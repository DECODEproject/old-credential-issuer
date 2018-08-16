.SILENT:
.PHONY: test

define dc-run
	docker-compose run
endef

define d-run
	docker run --rm
endef


build:
	docker-compose build

start:
	docker-compose up

lint:
	$(dc-run) credential-issuer npm run lint

test:
	$(dc-run) credential-issuer npm test

test/watch:
	$(dc-run) credential-issuer npm run test-watch

ci/build:
	docker build -t credential-issuer .

ci/lint:
	$(d-run) credential-issuer npm run lint

ci/test:
	$(d-run) credential-issuer npm test
