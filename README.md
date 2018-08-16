# Credential issuer

Issues a coconut credential for DECODE pilots.

The ID that requests the credential is checked using a verifier service.

You can find an example of a [verifier service](https://github.com/DECODEproject/verifier-api-definition)


## Getting started

1. Clone the verifier service under a `./verifier` directory.
  For example, run the following command under the root directory of this repository:

```
git clone https://github.com/DECODEproject/verifier-api-definition verifier
```

2. Build the Docker images for the Credential Issuer and the Verifier services.
  The configuration is done in `docker-compose.yml` and all commands are in `Makefile`, so just run:

```
make build
```

3. Start both services by using the following command:

```
make start
```

The Credential Issuer will listen to port 3000.


## Checking that it works

Run the following curl request (__any DNI value__ will be accepted).

```
curl -X POST \
  http://localhost:3000/issue-credential \
  -H 'Content-Type: application/json' \
  -d '{
	"dni": "12345678A"
}'
```

The response should be:

```
{
  "credential": "123456789"
}
```
