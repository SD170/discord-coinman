FROM node:alpine

# workdir of the container
WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

# running the nodejs app with nodemon (for dev)
# CMD [ "npm", "run", "dev" ]
# running the nodejs app
CMD [ "npm", "start" ]


