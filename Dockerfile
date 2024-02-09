# Step 1: Use a base image with Node.js. Nuxt 3 requires Node.js 14 or later.
FROM node:20-bookworm

ENV NITRO_PRESET node-server

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

# Install playwright
RUN npx -y playwright@1.41.1 install --with-deps

# Step 6: Copy the rest of the application code into the working directory
COPY . .

# Step 7: Build the application if needed. This step can be omitted if you're running a development server.
RUN pnpm build



# Step 8: Expose the port that Nuxt will run on
ENV EXPOSE 3000

# Step 10: Build the application
CMD ["node", ".output/server/index.mjs"]
