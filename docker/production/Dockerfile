FROM node:10.15.3-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
# Install yarn and other dependencies via apk
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install

# Set environment variables
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000

# Bundle app source
COPY . /app
RUN yarn build

# Clear the cache
RUN yarn cache clean

EXPOSE 3000
CMD [ "yarn", "start" ]
