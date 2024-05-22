# Use a specific Node.js version as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Command to start the application
CMD ["node", "app.js"]