# Use the official Node.js image as the base image
FROM node:14 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build the application (if necessary; otherwise, adjust as needed)
RUN npm run build

# Use a smaller base image for production
FROM node:14-slim

# Set the working directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD [ "node", "server.js" ]