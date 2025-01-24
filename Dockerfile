# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm install --production

COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "src/index.js"]
