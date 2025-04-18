FROM node:20-alpine as builder
RUN apk add --no-cache git curl

WORKDIR /builder

# Copy manifests, lock file, and yarn config
COPY package.json yarn.lock .yarnrc.yml ./

# Enable corepack and install dependencies using the lockfile
RUN corepack enable
RUN yarn install --immutable

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Create image by copying build artifacts
FROM node:20-alpine as runner

USER node

WORKDIR /home/node
COPY --chown=node:node --from=builder /builder/ ./

ARG PORT=3000
EXPOSE ${PORT}
CMD ["yarn", "start"]
