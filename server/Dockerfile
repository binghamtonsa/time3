FROM node:18.4.0

LABEL version="1.0"
LABEL description="back-end for time3 website"
LABEL maintainer="dengine1@binghamton.edu"

WORKDIR /server

COPY ["package.json", "package-lock.json", "./"]
COPY . .
EXPOSE 8000

CMD ["npm", "start"]
