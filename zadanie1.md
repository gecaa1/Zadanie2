## Polecenia do obsługi obrazu i kontenera

```bash
# a) Budowanie obrazu kontenera
docker build -t my-weather-app .

# b) Uruchomienie kontenera
docker run -d -p 3000:3000 --name weather weather-app

# c) Odczyt logów generowanych przy starcie aplikacji
docker logs weather

# d) Warstwy i ich rozmiary
docker history my-weather-app

# e) Rozmiar całego kontenera
docker images
