# Timesheet 3 

## Stuff to Look at:
- Login when it auto sets a shift for the person
- Clockin, doesn't load cordiate position right away, some issue in the awaits and async in dashboiard.jsx
- Clockout, add a option for the user to add notes 
- Private route cookie auth 

## Setup with Docker

This is the recommended route, at least for now.

### Prerequisites

- [Git](https://git-scm.com/) is required to clone the repository.
- [Docker Engine](https://www.docker.com/) is required to run the server software.
- [Docker Compose](https://docs.docker.com/compose/) is required to orchestrate Docker. You might already have it, depending on your OS; see [the install page](https://docs.docker.com/compose/install/) for more details.
- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/package/npm) are recommended to run linting and formatting tools on the host.

### Preparation

- **For each of: the root directory, the `client` directory, and the `server` directory, do the following**:
  - Make a copy of the environment file template:

    ```
    $ cp .env.template .env
    ```

  - Fill out the environment file according to the comments.
- Build the Docker images:
  ```
  $ docker-compose build
  ```
- (Optional) Install the development dependencies on the host:
  ```
  $ npm install --only=dev
  ```

## Usage

Run the Docker containers:

```
$ docker-compose up
```

### Preparation

## Setup without Docker

This section describes how to run time3 on your host, without Docker. The database component is TODO; you are on your own to setup and configure MySQL.

### Prerequisites

- [Git](https://git-scm.com/) is required to clone the repository.
- [Node.js](https://nodejs.org/en/) is required to run the software.
- [npm](https://www.npmjs.com/package/npm) is required to install the dependencies. It likely comes with your Node.js distribution.

### Preparation

#### Backend

- Enter the backend directory:

  ```
  $ cd server
  ```

- Make a copy of the environment file template:

  ```
  $ cp .env.template .env
  ```

- Fill out the environment file according to the comments.
- Install the dependencies:

  ```
  $ npm ci
  ```

#### Frontend

- Enter the frontend directory:

  ```
  $ cd client
  ```

- Install the dependencies:

  ```
  $ npm ci
  ```

#### Database

TODO

## Usage

First, start the database: TODO

Then, run the backend:

```
$ cd server
$ source .env
$ npm run start
```

Then, in another terminal, run the frontend:

```
$ cd client
$ npm run start
```
