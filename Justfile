build:
    npm --prefix ./client run build
    npm --prefix ./server run build

run:
    node ./server/build/server.js