# Stage 0 "build-stage": Based on Node.js to build and compile the frontend.
FROM node:latest AS build-stage
#FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app

# Note: Better if use a tar.gz, and copy using ADD command (?).
COPY . /app

# Try to hide/ignore the 'fsevents' warnings:
RUN npm install --loglevel=error
RUN npm run build

RUN echo "OS: " && uname -a && cat /etc/os-release | head -1
RUN echo "APP: " && ls -al /app | tail +4
RUN echo "DOCKER: " && ls -al /app/docker
#RUN echo "NGINX.CONF: " && cat /nginx.conf

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

#RUN echo "NGINX.CONF: " && cat /etc/nginx/conf.d/default.conf
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.orig

COPY --from=build-stage /app/dist/ /usr/share/nginx/app
COPY --from=build-stage /app/docker/app-nginx.conf /etc/nginx/conf.d/default.conf

RUN echo "APP: " && ls -al /usr/share/nginx/app
