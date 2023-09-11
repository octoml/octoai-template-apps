#!/bin/bash

set -euxo pipefail

docker_port=$(docker port clip-interrogator 8000/tcp)
ENDPOINT=localhost:${docker_port##*:}

echo "{\"image\": \"" > request.json
base64 my_test_image.png >> request.json
echo "\"}" >> request.json

curl -X POST http://${ENDPOINT}/predict \
    -H "Content-Type: application/json" \
    --data @request.json > response.json
