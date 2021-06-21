FROM node:12.16-alpine AS build

# Set the source folder
ARG SOURCE_FOLDER="./"
ARG BUILD_VERSION
ARG NPM_TOKEN

# Create app directory
WORKDIR /var/www/app

# Bundle app source
COPY ${SOURCE_FOLDER} .

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh curl && \
    npm config set unsafe-perm true && \
    echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
    npm install -g @angular/cli && \
    npm i --quiet --cache=./npm-cache 

RUN ng build --prod 

RUN ng build --prod --project=ls-vision-app

RUN rm -f .npmrc 
    

    
FROM labshare/docker-base-web

COPY --from=build /var/www/app/dist/ls-vision-app /var/www/app
