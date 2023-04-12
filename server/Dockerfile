FROM node:18-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "ci"]
VOLUME /app/node_modules

VOLUME /app
EXPOSE 8000

CMD ["npm", "start"]
