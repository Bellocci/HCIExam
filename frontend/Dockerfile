# Si utilizza l'immagine ufficiale node:17-alpine come immagine base
FROM node:17-alpine as build

# Imposto la working directory
WORKDIR /myfantasyteam-app/frontend/app

# Copio i file package.json e package-lock.json nella working directory
COPY ./myfanta-app/package.json .
COPY ./myfanta-app/package-lock.json .

# Installo tutte le dipendenze.
RUN npm install

# Aggiungo il codice sorgente nella cartella
COPY ./myfanta-app/. .