build:
    npm --prefix ./server run build
    npm --prefix ./client run build

run:
    node ./server/build/server.js

docker:
    npm --prefix ./server run build
    npm --prefix ./client run ci
    docker buildx build . --tag 'ghcr.io/xavier2p/helix:latest'