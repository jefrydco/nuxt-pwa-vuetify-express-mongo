FROM node:10.14.2-alpine

WORKDIR /app

ADD . .

ENV PORT 5000

RUN npm install
RUN npm run build

EXPOSE 5000
CMD [ "npm", "start" ]