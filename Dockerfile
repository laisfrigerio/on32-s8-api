FROM node:18

WORKDIR /usr/src/app

COPY package*.json /
COPY .env /.env
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]