FROM node:10.7.0-alpine
WORKDIR /code
COPY . /code
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
