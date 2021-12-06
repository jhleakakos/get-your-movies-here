FROM node

EXPOSE 3000

WORKDIR /usr/src/app
ADD package*.json ./
RUN npm install
ADD . .

CMD npm run nodemon
