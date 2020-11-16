# Blogging platform exercise

`version 0.0.0`

For interview tech skills evaluation

Features backlog [here](./docs/backlog.md)

[live demo](http://104.248.43.170:8000) 

## Dependencies

- **Node JS** version 14
- **yarn** package manager
- **PostgreSQL** database

## Structure

This project consists of server and client where each of them has separate `package.json`

More information  [here](./docs/structure.md)

### Server

Server loosely follows MVC pattern extending Restify web service framework


### Client

Client uses React Redux 

## Configuration

In order to run the server and build the client you need to create configuration file.

Copy `sample.config.yml` into `config.yml` and fill out the values according to your setup.

Then install packages for server and client

```bash
blogging-platform-exercise/server$ yarn
blogging-platform-exercise/client$ yarn
```

## Development

**server:**

```bash
blogging-platform-exercise/server$ yarn run dev
```

**client:**

check at `config.yml` that `client.apiRoute` links to the server

```bash
blogging-platform-exercise/client$ yarn run dev
```

go to http://localhost:9000/

## Build

build can be found at `server/dist/` and `client/dist/`

**server:**

```bash
blogging-platform-exercise/server$ yarn run build
```

**client:**

check at `config.yml` that `client.apiRoute` links to the server

```bash
blogging-platform-exercise/client$ yarn run build
```




