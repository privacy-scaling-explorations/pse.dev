#!/bin/bash
set -ex

build=$1
env=$2

[ $build = "enable" ] || exit 0

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 490752553772.dkr.ecr.eu-central-1.amazonaws.com

docker build -t pse-web-$env .
docker tag pse-web-$env:latest 490752553772.dkr.ecr.eu-central-1.amazonaws.com/pse-web-$env:latest
docker push 490752553772.dkr.ecr.eu-central-1.amazonaws.com/pse-web-$env:latest

exit 0
