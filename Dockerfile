# Use Node.js 22.x base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application
COPY . .

# Build your application
RUN npm run build

# Start your application
CMD ["npm", "start"]
