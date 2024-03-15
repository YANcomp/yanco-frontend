FROM node:lts AS builder
COPY . /github.com/YANcomp/yanco-frontend/source/
WORKDIR /github.com/YANcomp/yanco-frontend/source/
RUN npm install
RUN npm run build

FROM node:lts

WORKDIR /nuxtapp
COPY --from=builder /github.com/YANcomp/yanco-frontend/source/.output/ ./.output/
CMD [ "node", ".output/server/index.mjs" ]