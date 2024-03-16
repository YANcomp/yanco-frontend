FROM node:lts-alpine3.19 as builder

# update and install the latest dependencies for the alpine version
RUN apk update && apk upgrade && apk add dumb-init

# set work dir as app
WORKDIR /app
# copy the nuxt project package json and package json lock if available
COPY package* ./
# install all the project npm dependencies
RUN  npm install
# copy all other project files to working directory
COPY . ./
# build the nuxt project to generate the artifacts in .output directory
#RUN npx nuxt build
EXPOSE 3000

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
CMD ["dumb-init","npx nuxt dev"]

## we are using multi stage build process to keep the image size as small as possible
#FROM node:lts-alpine3.19
## update and install latest dependencies, add dumb-init package
## add a non root user
#RUN apk update && apk upgrade && apk add dumb-init && adduser -D nuxtuser
## set non root user
#USER nuxtuser
#
## set work dir as app
#WORKDIR /app
## copy the output directory to the /app directory from
## build stage with proper permissions for user nuxt user
#COPY --chown=nuxtuser:nuxtuser --from=builder /app/.output ./
## expose 8080 on container
#EXPOSE 3000
#
## set app host and port . In nuxt 3 this is based on nitro and you can read
##more on this https://nitro.unjs.io/deploy/node#environment-variables
#ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
## start the app with dumb init to spawn the Node.js runtime process
## with signal support
#CMD ["dumb-init","node","/app/server/index.mjs"]