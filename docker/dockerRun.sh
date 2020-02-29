#!/bin/bash

IMAGE_TAG="fuzzy/react-mapbox"

PUBLISH_PORT="9001"
CONTAINER_PORT="9001"

DOCKER_OPTS="--rm -p $PUBLISH_PORT:$CONTAINER_PORT"

echo "Docker image: $IMAGE_TAG"
echo "Starting a docker container..."
docker run $DOCKER_OPTS $IMAGE_TAG
