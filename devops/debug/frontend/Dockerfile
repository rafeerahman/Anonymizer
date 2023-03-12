# syntax=docker/dockerfile:1
FROM node:19

ARG FRONTEND_DIR
ARG VER

RUN export NODE_ENV=${VER} && echo "NODE_ENV=${NODE_ENV}"


RUN mkdir -p /var/www && chown -R node:node /var/www

COPY $FRONTEND_DIR /var/www/

# RUN apt-get update; apt-get install -y nodejs npm; apt-get clean;

WORKDIR /var/www

RUN ls -la

RUN npm install && npm install -g serve

ENV REACT_APP_BASE_URL=http://localhost:3000

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]

# RUN npm start
# CMD ["npm", "start"]
