##### Deps #####
FROM playcourt/nodejs:20-alpine AS deps

USER root

ARG ARGS_NODE_BUILD

ENV BABEL_DISABLE_CACHE=1

WORKDIR /usr/src/app

COPY package.json .npmrc yarn.lock ./
#COPY .env.${ARGS_NODE_BUILD}.dist ./.env
COPY .env .env

RUN yarn install

##### Builder #####
FROM playcourt/nodejs:20-alpine AS builder

USER root

ARG ARGS_NODE_BUILD

ENV BABEL_DISABLE_CACHE=1

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
#COPY --from=deps /usr/src/app/.env ./.env
COPY .env .env
COPY . .

RUN yarn build

##### Runner #####
FROM playcourt/nodejs:20-alpine AS runner

ARG ARGS_NODE_BUILD

ENV BABEL_DISABLE_CACHE=1

ARG SCM_COMMIT_ID
ENV DD_VERSION=${SCM_COMMIT_ID}

WORKDIR /usr/src/app

#COPY --from=builder /usr/src/app/.env.${ARGS_NODE_BUILD}.dist ./.env
COPY .env .env
COPY --from=builder /usr/src/app/next.config.js ./next.config.js
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

#USER user

EXPOSE 4000

CMD ["npm", "start"]
