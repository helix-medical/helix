FROM mariadb:latest

ENV MYSQL_DATABASE=helix

COPY ./scripts/ /docker-entrypoint-initdb.d/