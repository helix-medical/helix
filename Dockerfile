################################################################################
##########        ██╗  ██╗███████╗██╗     ██╗██╗  ██╗             ##############
##########        ██║  ██║██╔════╝██║     ██║╚██╗██╔╝             ##############
##########        ███████║█████╗  ██║     ██║ ╚███╔╝              ##############
##########        ██╔══██║██╔══╝  ██║     ██║ ██╔██╗              ##############
##########        ██║  ██║███████╗███████╗██║██╔╝ ██╗             ##############
##########        ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═╝             ##############
################################################################################

# Docker image of Helix

# Based on Alpine Linux (https://hub.docker.com/_/alpine) 
# and Node.js (https://hub.docker.com/_/node)

# Repository: https://github.com/Xavier2p/helix
# License: GPL-3.0
# Author: Xavier2p <contact.helix@skiff.com>
# Image published at: https://hub.docker.com/r/xavier2p/helix


################################################################################
# Builder from Node
################################################################################
FROM alpine:latest AS builder
RUN apk add --update npm

################################################################################
# Build Server
################################################################################
FROM builder AS builder-server
WORKDIR /app

# Install packages
COPY server/package*.json .
RUN npm clean-install

# Copy the builded server
COPY server/build ./

################################################################################
# Build Client
################################################################################
FROM builder AS builder-client
WORKDIR /app

# Install packages
COPY client/package*.json .
RUN npm clean-install

# Copy the builded client
COPY client/dist ./

################################################################################
# Build Final Image
################################################################################
FROM alpine:latest AS production
WORKDIR /helix

# Install node
RUN apk add --update nodejs

# Copy the app
COPY --from=builder-server /app ./build
COPY --from=builder-server /app/node_modules ./node_modules
COPY --from=builder-client /app ./build/www

# Set the port
EXPOSE 3001

# Start the app
CMD [ "node", "build/server.js" ]