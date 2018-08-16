.SILENT:
.PHONY:

define d-run
	docker run --rm
endef


ci/build:
	docker build -t credential-issuer .

ci/lint:
	$(d-run) credential-issuer npm run lint

ci/test:
	$(d-run) credential-issuer npm test
