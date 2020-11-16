# Blogging platform exercise
For interview tech skills evaluation

## Live demo

- live demo can be found here

## Dependencies

- **Node JS** version 14
- **yarn** package manager
- **PostgreSQL** database

## Structure

This project consists of server and client where each of them has separate `package.json`

### Server

Server loosely follows MVC pattern extending Restify web service framework


### Client

Client uses React Redux 

## Configuration

In order to run the server and build the client you need to create configuration file.

Copy `sample.config.yml` into `config.yml` and fill out the values according to your setup.

Then install packages for server and client

```bash
blogging-platform-excercise/server$ yarn
blogging-platform-excercise/client$ yarn
```

## Development

**server:**

```bash
blogging-platform-excercise/server$ yarn run dev
```

**client:**

check at `config.yml` that `client.apiRoute` links to the server

```bash
blogging-platform-excercise/client$ yarn run dev
```

go to http://localhost:9000/

## Build

build can be found at `server/dist/` and `client/dist/`

**server:**

```bash
blogging-platform-excercise/server$ yarn run build
```

**client:**

check at `config.yml` that `client.apiRoute` links to the server

```bash
blogging-platform-excercise/client$ yarn run build
```




