FROM node:18.8-alpine3.16

# install node_modules
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev

# copy app and start it
COPY . .
EXPOSE 3434
CMD [ "node", "server.js" ]
