# Use an official Node.js runtime as the base image
FROM node:latest

# Working directory
WORKDIR /

# Copy the files into the docker image
COPY . .

# Install npm dependencies
RUN npm install

# Expose the port on which the application will run
EXPOSE 3000

# Command to start the application
CMD ["node", "app.js"]