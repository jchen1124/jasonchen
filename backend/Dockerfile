# Use official Node.js LTS version
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port your app will run on
EXPOSE 3002

# Command to run your app
CMD ["node", "server.js"]
