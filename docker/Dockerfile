FROM node:lts AS builder
COPY . /github.com/YANcomp/yanco-frontend/source/
WORKDIR /github.com/YANcomp/yanco-frontend/source/
RUN npm install
RUN npm run build
RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true \

FROM node:lts

WORKDIR /nuxtapp
COPY --from=builder /github.com/YANcomp/yanco-frontend/source/.output/ ./.output/
CMD [ "node", ".output/server/index.mjs" ]