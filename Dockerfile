FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT_API=3001

EXPOSE 3001

CMD [ "npm", "run", "deploy" ]
