FROM node:18-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
COPY . .
EXPOSE 8000

CMD ["npm", "start"]
