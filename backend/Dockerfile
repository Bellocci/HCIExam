# Usa l'immagine ufficiale di Python come immagine base
FROM python:3.9-slim

# Imposta la directory di lavoro nel container
WORKDIR /myfantasyteam-app/backend

# Copia i file delle dipendenze
COPY requirements.txt .

# Installa le dipendenze
RUN pip install -r requirements.txt

# Copia il resto del contenuto della cartella backend nel container
COPY . .