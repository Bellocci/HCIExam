### Stage 1: Compile and build angular codebase ###

# Si utilizza l'immagine ufficiale node:17-alpine come immagine base
FROM node:17-alpine as build
# Imposto la working directory
WORKDIR /usr/local/myfanta-app
# Aggiungo il codice sorgente nella cartella
COPY ./ /usr/local/myfanta-app/
# Installo tutte le dipendenze.
RUN npm install
# Genero la build dell'applicazione
RUN npm run build


### Stage 2: Distribuire l'applicazione con server nginx

# Si utilizza l'ultima versione ufficiale stable come immagine base
FROM nginx:latest
# Copia l'output ottenuto dalla build in modo da sostituire il contenuto default di nginx
COPY --from=build /usr/local/myfanta-app/dist/myfanta-app /usr/share/nginx/html
# Espone la porta 80
EXPOSE 80
