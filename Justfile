build:
    npm --prefix ./client run build
    npm --prefix ./server run build

run:
    node ./server/build/server.js

docker:
    npm --prefix ./client run ci
    npm --prefix ./server run build
    docker buildx build . --tag xavier2p/helix:latest