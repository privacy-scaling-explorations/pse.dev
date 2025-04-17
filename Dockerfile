FROM node:20-alpine as builder
RUN apk add --no-cache git curl

WORKDIR /builder

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Create image by copying build artifacts
FROM node:20-alpine as runner

USER node

WORKDIR /home/node
COPY --chown=node:node --from=builder /builder/ ./

ARG PORT=3000
EXPOSE ${PORT}
CMD ["yarn", "start"]
