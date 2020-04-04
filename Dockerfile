FROM node:10

RUN mkdir -p /opt/project
WORKDIR /opt/project

RUN node --version
RUN npm --version

COPY package* ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./dist/main.js" ]
