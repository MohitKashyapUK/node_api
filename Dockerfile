# Use an official Node.js runtime as the base image
FROM node:latest

RUN apt-get install git

RUN git clone https://github.com/MohitKashyapUK/node_api.git

# Set the working directory in the container
WORKDIR /node_api

# Install npm dependencies
RUN npm install

# Expose the port on which the application will run
EXPOSE 3000

# Command to start the application
CMD ["node", "app.js"]
