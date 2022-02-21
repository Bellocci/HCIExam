### Stage 1: build ###

FROM node:17-alpine as builder

RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY myfanta-app/package.json myfanta-app/package-lock.json /app/myfanta-app/

# Install app dependencies.
RUN npm install --prefix myfanta-app

# Copy app files.
COPY . /app

EXPOSE 4200

# Run app
CMD ["npm", "start", "--prefix", "myfanta-app"]
