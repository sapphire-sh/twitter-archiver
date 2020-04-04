#!/bin/bash

set -ex

docker-compose build && \
docker-compose down && \
docker-compose up -d --remove-orphans
