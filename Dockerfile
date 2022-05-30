FROM node:18.1.0
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY package*.json /usr/src/app/
RUN apt-get update
RUN npm install -g nodemon
RUN npm install 
COPY . /usr/src/app
COPY . .
EXPOSE 3000
CMD ["npm","start"]