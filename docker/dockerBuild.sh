#!/bin/bash

# Docker can only access files within the context.
PROJ_CONTEXT=..

IMAGE_TAG="fuzzy/react-mapbox"

DOCKER_OPTS=""
#DOCKER_OPTS="--no-cache"

docker build -f ./Dockerfile -t $IMAGE_TAG $DOCKER_OPTS $PROJ_CONTEXT


