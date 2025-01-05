# Blog de Calatorii

## Scopul Proiectului

"Blog de Calatorii" este o aplicatie web destinata pasionatilor de calatorii, oferind utilizatorilor posibilitatea de a explora destinatii populare, de a accesa detalii despre autorul blogului si de a se conecta pentru a primi notificari personalizate. Proiectul combina design modern cu functionalitati dinamice si securizate pentru a crea o experienta interactiva si usor de utilizat.

## Functionalitati principale

- Navigare intre pagini: **"Acasa"**, **"Destinatii"**, **"Despre Mine"**, **"Contact"** si **"Login/Inregistrare"**.
- Sistem de autentificare si inregistrare bazat pe token JWT.
- Un slideshow interactiv pentru prezentarea imaginilor din destinatii.
- Design responsive si atractiv, cu efecte moderne de hover si gradienturi personalizate.

## Instructiuni de Instalare si Rulare

### 1. Cerinte Prealabile

- **Node.js** instalat (versiunea 16.x sau mai recenta)
- **PostgreSQL** instalat si configurat
- Un browser web modern (**Google Chrome**, **Firefox**, **Edge** etc.)

### 2. Configurarea Proiectului

1. Cloneaza proiectul din repository:
   ```bash
   git clone <URL_REPO>

2. Navigheaza in directorul proiectului:
   ```bash
   cd Blog-de-Calatorii

3. Instaleaza dependintele necesare:
   ```bash
   npm install

4. Configureaza baza de date PostgreSQL:
- Creeaza o baza de date denumita magazin_online.
- Creeaza tabelul utilizatori folosind urmatoarea comanda SQL: 
    
    CREATE TABLE utilizatori (
    id SERIAL PRIMARY KEY,
    nume_utilizator VARCHAR(255) UNIQUE NOT NULL,
    parola VARCHAR(255) NOT NULL
                            );

5. Configureaza conexiunea la baza de date in fisierul server.js

## Bibliografia Folosita

- [Documentatia oficiala Node.js](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/)
- [JWT - JSON Web Tokens](https://jwt.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MDN Web Docs - HTML, CSS, JavaScript](https://developer.mozilla.org/)
