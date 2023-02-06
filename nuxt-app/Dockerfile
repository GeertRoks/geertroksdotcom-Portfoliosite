FROM node:16-alpine3.16

# install node_modules
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# copy app and build it
COPY . .
RUN npm run build
RUN npm run generate

# serve the app
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "run", "start" ]
