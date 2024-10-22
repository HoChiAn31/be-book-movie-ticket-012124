# Use the official Node.js 16 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to the container

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port your Nest.js application is listening on
EXPOSE 5000

# Command to start your Nest.js application
CMD [ "yarn", "run", "start:prod" ]