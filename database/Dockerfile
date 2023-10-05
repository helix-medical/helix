FROM mariadb:latest

ENV MYSQL_DATABASE=helix

COPY ./scripts/ /docker-entrypoint-initdb.d/

HEALTHCHECK CMD ["healthcheck.sh", "--su=mysql", "--connect", "--innodb_initialized"]