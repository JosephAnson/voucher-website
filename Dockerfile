FROM node:18-alpine as base

# create work directory in app folder
WORKDIR /src

# install required packages for node image
RUN apk add openssh g++ make python3 git

ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=$PORT

# Build
FROM base AS build

COPY --link package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY --link . .

RUN yarn run build

# Copy the build output and node_modules
FROM base
COPY --from=build /src/.output /src/.output
# COPY --from=build /src/node_modules /src/node_modules

# Expose the port
EXPOSE $PORT

# Run
CMD [ "node", ".output/server/index.mjs" ]
