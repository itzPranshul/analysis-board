# Use a secure, minimal Node.js base image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Install essential build tools (node-gyp may need them)
RUN apt-get update && apt-get install -y python3 build-essential && rm -rf /var/lib/apt/lists/*

# Copy package files first for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Build the app
RUN npm run build

# Install a lightweight HTTP server
RUN npm install -g serve

# Expose Vite preview port
EXPOSE 4173

# Run the preview server
CMD ["npm", "run", "preview"]
