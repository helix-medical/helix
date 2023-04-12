FROM mysql:latest

ENV MYSQL_DATABASE=helix

COPY ./scripts/ /docker-entrypoint-initdb.d/