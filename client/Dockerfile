FROM node:18-alpine

LABEL version="1.0"
LABEL description="Front-end for time3 website"
LABEL maintainer="dengine1@binghamton.edu"

WORKDIR /client

COPY ["package.json", "package-lock.json", "./"]
COPY . .
EXPOSE 3000

CMD ["npm", "start"]


