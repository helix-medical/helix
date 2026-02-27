# Helix Helpers Commands

To run any of these commands, please use the [`mask`](https://github.com/jacobdeichert/mask) utility.

## build (part)

> Builds the Helix stack. Specify the argument (`client|server|all`).

```sh
if [[ "$part" != "all" && "$part" != "client" && "$part" != "server" ]]; then
  echo "Choose one of client | server | all"
  exit 1
fi

if [[ "$part" == "client" || "$part" == "all" ]]; then
  yarn --cwd ./client run build
fi

if [[ "$part" == "server" || "$part" == "all" ]]; then
  yarn --cwd ./server run build
fi
```

## dev

> Launch the dev stack (LogTo / API / Client).

### dev helix

> Start or restart the Helix Docker Container (need a rebuild).

```sh
${MASK} docker
docker compose -f ./docker/helix.compose.yml up --force-restart
```

### dev start

> Start the database and the LogTo instance.

```sh
docker compose -f ./docker/logto.compose.yml up --detach
docker compose -f ./docker/db.compose.yml up --detach
```

## docker

> Builds the Docker Image of Helix AiO (client + server, production mode)

```sh
yarn --cwd ./server run build
yarn --cwd ./client run ci
docker buildx build . -f ./main.dockerfile --tag 'helix/app:latest'
```
