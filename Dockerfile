FROM node:18-alpine

RUN mkdir -p /opt/project
WORKDIR /opt/project

RUN node --version
RUN npm --version

COPY package* ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "node", "./dist/main.js" ]
