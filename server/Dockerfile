FROM node:carbon

RUN mkdir -p /opt/app

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
# My understanding of this is that when we are using compose in development,
# we would almost always be running or (re)building the image. In production
# the images need to be already built to be used in a swarm.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Set default host and port for Node's Express library
ARG PORT=3001
ENV PORT $PORT

ARG HOST=0.0.0.0
ENV HOST $HOST

EXPOSE $PORT

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK CMD curl -fs http://$HOST:$PORT/health || exit 1

# install dependencies first, in a different location for easier app bind
# mounting for local development
WORKDIR /opt

COPY package*.json ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
WORKDIR /opt/app
COPY . /opt/app

CMD [ "npm", "start" ]

