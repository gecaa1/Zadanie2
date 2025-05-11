# Etap 1 – Budowanie zależności
FROM node:20-alpine AS build

# Metadane obrazu: autor
LABEL org.opencontainers.image.authors="Martyna Geca"

# Ustawienie katalogu roboczego 
WORKDIR /app

# Kopiowanie plików package.json i package-lock.json do obrazu
COPY package*.json ./

# Instalacja zależności z package.json przy użyciu npm
# 'npm ci' instaluje dokładnie zależności z pliku package-lock.json, ignorując zależności dev
RUN npm ci --omit=dev

# Kopiowanie tylko pliku index.js, który jest potrzebny do uruchomienia aplikacji
COPY index.js ./

# Etap 2 – Obraz końcowy
FROM node:20-alpine

# Ustawienie katalogu roboczeg
WORKDIR /app

# Kopiowanie plików z etapu build do obrazu końcowego
COPY --from=build /app /app

# Otwieranie portu 3000
EXPOSE 3000

# Ustawienie Healthcheck, aby monitorować stan kontenera
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -q --spider http://localhost:3000 || exit 1

# Ustawienie domyślnej komendy do uruchomienia aplikacji
CMD ["npm", "start"]
