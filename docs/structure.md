# Code Structure
And how it should look

The repostitory is split into two parts

client and server, where each has its own package.jsonconcerns

## Server

### Main libraries:
- TypeScript
- Restify
- TypeORM


### Layers

- Controller
    - provides REST interface
    - handles business logic
- Entity
    - database types
- Repository
    - Contains more advanced database data manipulations
- DAO
    - Maps inner entity objects into client safe objects
- Service

## Client
### Main libraries
- TypeScript
- React
- Redux
- React Router
- Redux Thunk
- Axios
- Reselect
- css modules with Sass

### Layers

- Reducer
    - realizes state operations
- Actions
    - define state operations
    - handle asynchronous actions
- Containers
    - pages
    - map state and state actions to props
- Selectors
    - derive other properties from state
- Components
    - contain UI components