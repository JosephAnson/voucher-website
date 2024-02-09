FROM node:20-bookworm AS build

ENV NITRO_PRESET node-server
ENV APP_ENV build

ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG OPENAI_API_KEY
ARG REDIS_HOST
ARG REDIS_PASSWORD

ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_KEY=${SUPABASE_KEY}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PASSWORD=${REDIS_PASSWORD}

WORKDIR /app

RUN npm install -g pnpm
RUN npx -y playwright@1.41.1 install --with-deps

FROM build AS package

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM package AS create

COPY . .

RUN pnpm build

ENV EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
