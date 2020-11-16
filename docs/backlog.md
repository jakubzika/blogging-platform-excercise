# TODO

Contains features not yet implemented and how they could be implemented

## Mandatory

- prevent XSS - converted markdown is not checked for 
    - https://github.com/cure53/DOMPurify

- article
    - api response does not contain comment count - enhance query using SQL builder

- voting

- realtime voting and commenting
    - websocket pub sub service - either library or custom implementation
    - on page load - open websocket connection to server
    - when user loads article page, subscribe via websocket
    - when users leaves article page, unsubscribe
    - when comment is created or voted on,server broadcasts message to users subscribed to the article

- testing

- SWAGGER api documentation

- images

- docker
    - im not experienced in writing Dockerfiles and docker-compose

- input validation


## Other
- token refresh
- decrease bundle size
- display loading spinners - better for slower connections
- better redirection on login - go to where user originally wanted to go
- web responsibility - right now only fullscreen desktop size is supported
- database migrations