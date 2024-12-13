# FROM node:18-alpine AS build
# MAINTAINER yehuda
# WORKDIR /src/App
# COPY . .
# EXPOSE 8080
# RUN npm run build
# CMD ["nginx", "-g", "daemon off;"]

# Use a lightweight Node.js image for building
FROM node:18-alpine AS build
# Set working directory
WORKDIR /src/App
# Copy package files
COPY package*.json ./
# install dependencies
RUN npm install
# Copy source code
COPY . .
# build the app
RUN npm run build
# Use a lightweight web server to serve the app
FROM nginx:stable-alpine
# העתקת האפליקציה הבנויה ל-nginx
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 for the container
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
