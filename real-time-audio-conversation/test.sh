set -euxo pipefail

ENDPOINT=localhost:8000

curl --fail -X POST http://${ENDPOINT}/predict \
    -H "Content-Type: application/json" \
    --data '{"url": "https://user-images.githubusercontent.com/36994049/208253969-7e35fe2a-7541-434a-ae91-8e919540555d.mp4", "task": "transcribe", "diarize": true}'

