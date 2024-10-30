FROM node:18-alpine3.18 as builder
RUN apk add --no-cache git curl

WORKDIR /builder

COPY package.json yarn.lock ./
RUN npm i -g yarn && yarn install

COPY . .
RUN yarn build



# Create image by copying build artifacts
FROM node:18-alpine3.18 as runner
RUN rm -rf /usr/local/bin/yarn && npm i -g yarn --force

USER node
ARG PORT=3000

WORKDIR /home/node
COPY --chown=node:node  --from=builder /builder/ ./

EXPOSE ${PORT}
CMD ["yarn", "start"]
