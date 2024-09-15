build:
    npm --prefix ./server run build
    npm --prefix ./client run build

run: build
    node ./server/build/server.js

docker:
    npm --prefix ./server run build
    npm --prefix ./client run ci
    docker buildx build . -f main.dockerfile --tag 'ghcr.io/xavier2p/helix:latest'