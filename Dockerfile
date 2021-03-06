FROM node:10.14.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install
COPY . /usr/src/app
RUN yarn build
EXPOSE 3000
CMD ["node", "./backend/app.js"]
