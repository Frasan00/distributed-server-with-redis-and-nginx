FROM node:latest
WORKDIR /app
COPY *.json .
RUN npm i
COPY /src .
EXPOSE 5000
CMD [ "npm", "run", "build" ]