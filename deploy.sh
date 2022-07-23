#!/usr/bin/env bash

AGILE_HELPER_PORTAL_DOCKER_COMPOSE_LOCATION=/home/agile-helper-portal-deploy

echo "copy the deployment file to remote server"
scp -r  ./docker-compose.yml root@1.15.47.161:$AGILE_HELPER_PORTAL_DOCKER_COMPOSE_LOCATION/docker-compose.yml
scp -r  ./nginx.conf root@1.15.47.161:$AGILE_HELPER_PORTAL_DOCKER_COMPOSE_LOCATION/nginx.conf
scp -r  ./build root@1.15.47.161:$AGILE_HELPER_PORTAL_DOCKER_COMPOSE_LOCATION/

ssh root@1.15.47.161 "
printf '\n\n----------------------------------deploy--------------------------------------------\n\n'
docker stack deploy -c $AGILE_HELPER_PORTAL_DOCKER_COMPOSE_LOCATION/docker-compose.yml uma
"