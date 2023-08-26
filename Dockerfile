FROM node:18-alpine as base

# install required packages for node image
RUN apk add openssh g++ make python3 git

# create work directory in app folder
WORKDIR /src

ENV NODE_ENV=production
ENV PORT=3000

# copy the app, note .dockerignore
COPY --link package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Lint
FROM base as lint
COPY . .
RUN npm run lint

# Build
FROM base AS build
COPY . .
RUN yarn run build

# Copy the build output and node_modules
FROM base AS release
COPY --from=build /src/.output /src/.output

# Expose the port
EXPOSE 3000

# Run
CMD [ "node", ".output/server/index.mjs" ]
