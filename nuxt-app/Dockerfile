FROM node:20-alpine

# install node_modules
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# copy app and build it
COPY . .
RUN npm run build

# serve the app
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", ".output/server/index.mjs" ]
