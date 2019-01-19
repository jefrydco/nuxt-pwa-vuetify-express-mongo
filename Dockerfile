FROM node:10.14.2-alpine

WORKDIR /app

ADD . .

ENV PORT 5000

EXPOSE 5000
CMD [ "npm", "start" ]