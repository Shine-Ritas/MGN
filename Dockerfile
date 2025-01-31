# Build Stage
FROM node:18.20.5 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json ./

# Install dependencies
RUN npm install --no-audit --no-fund --verbose

# Copy the rest of the application files to the working directory
COPY . .

# Build the React application (for production)
RUN npm run build

# Production Stage
FROM nginx:1.21.3-alpine as production-stage

# Set NGINX configuration file
COPY ./docker/config/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build artifacts from the build stage to NGINX web server
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/

# Fix permissions and make sure the necessary files have correct ownership
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /etc/nginx && \
    chmod -R 755 /usr/share/nginx/html /var/cache/nginx /etc/nginx

# Set the user to nginx for better security
# USER nginx⁄

# Expose port 80 to allow web traffic
EXPOSE 80

# Command to run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
