### Stage 1: Compile and build angular codebase ###

# Utilizza 17-alpine come immmagine officiale per l'immagine base del container
FROM node:17-alpine as builder
# Imposto la working directory
WORKDIR /usr/local/app/myfanta-app
# Aggiungo il codice sorgente nella cartella
COPY ./ /usr/local/app/myfanta-app/
# Installo tutte le dipendenze.
RUN npm install
# Genero la build dell'applicazione
RUN npm run build
# Output directory


### Stage 2: Distribuire l'applicazione con server nginx

# Utilizza  

# Copy app files.
COPY . /app

EXPOSE 4200

# Run app
CMD ["npm", "start", "--prefix", "myfanta-app"]
