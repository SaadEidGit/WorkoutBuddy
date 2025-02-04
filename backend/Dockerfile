FROM node:23.6.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]