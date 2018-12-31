FROM node:10.14.2-alpine

WORKDIR /app

ADD . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]