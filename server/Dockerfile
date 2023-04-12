FROM node:18-alpine

LABEL org.opencontainers.image.authors="Dhruv Engineer <dengine1@binghamton.edu>, Lucy Loerker <sysadmin@binghamtonsa.org>"
LABEL org.opencontainers.image.source="https://github.com/binghamtonsa/time3"
LABEL org.opencontainers.image.vendor="Student Association of Binghamton University Inc."
LABEL org.opencontainers.image.licenses="ISC"
LABEL org.opencontainers.image.title="time3 backend"
LABEL org.opencontainers.image.description="Backend API for Binghamton SA Timesheet v3"

WORKDIR /server

COPY ["package.json", "package-lock.json", "./"]
COPY . .
EXPOSE 8000

CMD ["npm", "start"]
