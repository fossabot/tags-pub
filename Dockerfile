FROM node:8-alpine

WORKDIR /opt/tags-pub

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY . .

EXPOSE 80

CMD ["node", "bin/www"]
