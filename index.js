const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const PORT = 3000;

// Zmienna przechowująca datę uruchomienia aplikacji
const dataStartu = new Date().toLocaleString();
// Zmienna przechowująca autora aplikacji
const autor = 'Martyna Geca';


// Wyświetlanie informacji o uruchomieniu aplikacji w konsoli
console.log(`Aplikacja uruchomiona: ${dataStartu}`);
console.log(`Autor: ${autor}`);
console.log(`Nasłuchiwanie na porcie: ${PORT}`);

// Middleware do parsowania danych formularza
app.use(bodyParser.urlencoded({ extended: true }));

// Strona główna z formularzem wyboru kraju i miasta
app.get('/', (req, res) => {
  res.send(`
    <h1>Sprawdź pogodę</h1>
    <form method="POST" action="/pogoda">
      <label for="kraj">Wybierz kraj:</label>
      <select name="kraj" id="kraj">
        <option value="PL">Polska</option>
        <option value="US">USA</option>
        <option value="GB">Wielka Brytania</option>
        <option value="DE">Niemcy</option>
      </select><br><br>

      <label for="miasto">Wybierz miasto:</label>
      <select name="miasto" id="miasto">
        <option value="Warsaw">Warszawa</option>
        <option value="New York">Nowy Jork</option>
        <option value="London">Londyn</option>
        <option value="Berlin">Berlin</option>
      </select><br><br>

      <button type="submit">Pokaż pogodę</button>
    </form>
    
    <script>
      // Obsługa zmiany wyboru kraju
      document.getElementById('kraj').addEventListener('change', function() {
        const kraj = this.value;
        const miastoSelect = document.getElementById('miasto');
        
        // Mapa miast dostępnych w danym kraju
        const miasta = {
          'PL': ['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk'],
          'US': ['New York', 'Los Angeles', 'Chicago', 'Miami'],
          'GB': ['London', 'Manchester', 'Birmingham', 'Edinburgh'],
          'DE': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg']
        };

        // Czyszczenie poprzednich opcji i dodanie nowych
        miastoSelect.innerHTML = '';

        miasta[kraj].forEach(miasto => {
          const option = document.createElement('option');
          option.value = miasto;
          option.textContent = miasto;
          miastoSelect.appendChild(option);
        });
      });
    </script>
  `);
});

// Obsługa formularza - pobieranie danych o pogodzie
app.post('/pogoda', async (req, res) => {
  // Odczytanie wartości wybranych w formularzu
  const miasto = req.body.miasto;
  const kraj = req.body.kraj;
  const apiKey = '76e4832d88ddae426cc76911db6118f2';

  // Tworzenie URL do API pogodowego
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${miasto},${kraj}&units=m`;

  try {
    // Wysłanie zapytania do API i pobranie danych o pogodzie
    const response = await axios.get(url);
    const pogoda = response.data;

    // Wyciąganie temperatury i opisu pogody
    const temperatura = pogoda.current.temperature;
    const opis = pogoda.current.weather_descriptions[0];

    // Wyświetlanie wyników na stronie
    res.send(`
      <h2>Pogoda dla ${miasto}, ${kraj}:</h2>
      <p>Temperatura: ${temperatura} °C</p>
      <p>Opis: ${opis}</p>
      <a href="/">Wróć</a>
    `);
  } catch (error) {
    // Obsługa błędów związanych z API
    res.send(`<p>Nie udało się pobrać pogody. Sprawdź nazwę miasta i kraj lub klucz API.</p>
              <a href="/">Spróbuj ponownie</a>`);
  }
});

// Uruchomienie serwera 
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
