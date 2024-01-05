################################################################################
##########          ██╗  ██╗███████╗██╗     ██╗██╗  ██╗           ##############
##########          ██║  ██║██╔════╝██║     ██║╚██╗██╔╝           ##############
##########          ███████║█████╗  ██║     ██║ ╚███╔╝            ##############
##########          ██╔══██║██╔══╝  ██║     ██║ ██╔██╗            ##############
##########          ██║  ██║███████╗███████╗██║██╔╝ ██╗           ##############
##########          ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═╝           ##############
################################################################################

# Docker image of the Helix Website

# Based on Alpine Linux (https://hub.docker.com/_/alpine) 
# and NGINX (https://hub.docker.com/_/nginx)

# Repository: https://github.com/Xavier2p/helix
# License: GPL-3.0
# Author: Xavier2p <contact.helix@skiff.com>
# Image published at: https://ghcr.io/xavier2p/helix-website

################################################################################
# Builder from Node
################################################################################
FROM alpine:latest AS builder
RUN apk add --update npm

################################################################################
# Build Website
################################################################################
FROM builder AS build
WORKDIR /helix-website

# Install packages
COPY website/package*.json ./
RUN npm clean-install

# Copy and build the project
COPY website .
RUN npm run docker

################################################################################
# Build Final Image
################################################################################
FROM nginx:alpine AS production
# state to verify
WORKDIR /usr/share/nginx/html/
COPY  --from=build /helix-website/dist .
