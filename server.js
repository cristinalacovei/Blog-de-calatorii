const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Cheie secretă pentru JWT (în practică, folosește o cheie mai complexă și o păstrează într-un loc sigur)
const JWT_SECRET = 'secretKeyForJWT';

app.use(cors());
app.use(bodyParser.json());

const db = pgp({
  user: 'postgres',
  password: 'cristinalacovei',
  host: 'localhost',
  port: 5432,
  database: 'magazin_online'
});

app.use(bodyParser.json());

// Endpoint pentru înregistrare
app.post('/register', async (req, res) => {
  const { nume_utilizator, parola } = req.body;

  try {
    // Verificăm dacă numele de utilizator este deja înregistrat
    const existingUser = await db.oneOrNone('SELECT * FROM utilizatori WHERE nume_utilizator = $1', [nume_utilizator]);

    if (existingUser) {
      return res.status(400).json({ message: 'Numele de utilizator este deja folosit.' });
    }

    // Adăugăm noul utilizator în baza de date
    await db.none('INSERT INTO utilizatori(nume_utilizator, parola) VALUES($1, $2)', [nume_utilizator, parola]);

    res.status(201).json({ message: 'Utilizator înregistrat cu succes!' });
  } catch (error) {
    console.error('Eroare la înregistrare:', error);
    res.status(500).json({ message: 'Eroare la înregistrare.' });
  }
});

// Endpoint pentru autentificare
app.post('/login', async (req, res) => {
  const { nume_utilizator, parola } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM utilizatori WHERE nume_utilizator = $1 AND parola = $2', [nume_utilizator, parola]);

    if (!user) {
      return res.status(401).json({ message: 'Numele de utilizator sau parola incorecte.' });
    }

    // Creează un token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Autentificare reușită!', token });
  } catch (error) {
    console.error('Eroare la autentificare:', error);
    res.status(500).json({ message: 'Eroare la autentificare.' });
  }
});

  app.post('/resource', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token lipsă.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        const utilizatorId = decoded.userId;

        // Acum puteți verifica ID-ul utilizatorului și acorda acces la resursă

        res.status(200).json({ message: 'Acces la resursă permis.' });
    } catch (error) {
        console.error('Eroare la verificarea token-ului:', error);
        res.status(401).json({ message: 'Token invalid.' });
    }
});



app.listen(PORT, () => {
  console.log(`Serverul rulează la adresa http://localhost:${PORT}`);
});



  
