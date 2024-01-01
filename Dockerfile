# Step 1: Use a base image with Node.js. Nuxt 3 requires Node.js 14 or later.
FROM node:18-alpine

ENV NITRO_PRESET node-server

ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG OPENAI_API_KEY
ARG KV_URL
ARG KV_REST_API_URL
ARG KV_REST_API_TOKEN
ARG KV_REST_API_READ_ONLY_TOKEN

ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_KEY=${SUPABASE_KEY}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV KV_URL=${KV_URL}
ENV KV_REST_API_URL=${KV_REST_API_URL}
ENV KV_REST_API_TOKEN=${KV_REST_API_TOKEN}
ENV KV_REST_API_READ_ONLY_TOKEN=${KV_REST_API_READ_ONLY_TOKEN}


# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Install pnpm
RUN npm install -g pnpm

# Step 4: Copy the package.json and pnpm-lock.yaml (or pnpm-workspace.yaml if you use workspaces)
# files into the working directory
COPY package.json pnpm-lock.yaml ./

# Step 5: Install dependencies using pnpm.
# The --frozen-lockfile option ensures that the installed packages match the lockfile.
RUN pnpm install --frozen-lockfile

# Step 6: Copy the rest of the application code into the working directory
COPY . .

# Step 7: Build the application if needed. This step can be omitted if you're running a development server.
RUN pnpm build

# Step 8: Expose the port that Nuxt will run on
ENV EXPOSE 3000

# Step 10: Build the application
CMD ["node", ".output/server/index.mjs"]
