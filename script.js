var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (slides && slides.length > 0) {
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000); // Schimbă imaginea la fiecare 2 secunde
    }
}

function getUserId() {
    // Trimite o cerere către server pentru a obține ID-ul utilizatorului din sesiune
    return fetch('http://localhost:3000/getUserId', {
        method: 'GET',
        credentials: 'include', // Include cookie-urile pentru autentificare
    })
        .then(response => response.json())
        .then(data => data.userId)
        .catch(error => {
            console.error('Eroare la obținerea ID-ului utilizatorului:', error);
            return null;
        });
}

// Funcție pentru înregistrare
function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (password !== confirmPassword) {
        alert('Parolele nu coincid.');
        return;
    }

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nume_utilizator: username, parola: password }),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Redirecționează utilizatorul către pagina de home
            window.location.href = 'home.html';
        })
        .catch(error => {
            console.error('Eroare la înregistrare:', error);
            alert('Eroare la înregistrare.');
        });
}

// Funcție pentru autentificare
function loginUser(event) {
    event.preventDefault();

    const loginUsername = document.getElementById('login_username').value;
    const loginPassword = document.getElementById('login_password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nume_utilizator: loginUsername, parola: loginPassword }),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.token) {
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('username', loginUsername); // Salvează numele utilizatorului
                // Redirecționează utilizatorul către pagina de home
                window.location.href = 'home.html';
            }
        })
        .catch(error => {
            console.error('Eroare la autentificare:', error);
            alert('Numele de utilizator sau parola incorecte.');
        });
}

// Funcție pentru resurse protejate
function requestProtectedResource() {
    const token = localStorage.getItem('jwtToken');

    fetch('http://localhost:3000/resource', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Adaugă token-ul JWT în header
        },
    })
        .then(response => response.json())
        .then(data => {
            // Manipulați răspunsul de la server aici
        })
        .catch(error => {
            console.error('Eroare la obținerea resursei protejate:', error);
        });
}

// Funcție pentru logout
function logoutUser() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    alert('Te-ai deconectat cu succes.');
    // Reîncarcă pagina pentru a reseta interfața
    window.location.reload();
}

// Verificare la încărcarea paginii de login
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        // Afișează mesajul și ascunde formularele de login/înregistrare
        document.getElementById('loggedInMessage').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Ești conectat ca ${username}`;
        document.getElementById('login').style.display = 'none';
        document.getElementById('inregistrare').style.display = 'none';
    }
});

function checkIfLoggedIn() {
  const token = localStorage.getItem('jwtToken');
  const username = localStorage.getItem('username');

  if (token && username) {
      // Verificăm dacă token-ul este valid
      fetch('http://localhost:3000/resource', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      })
      .then(response => {
          if (response.status === 200) {
              // Dacă token-ul este valid, afișăm mesajul de utilizator conectat
              document.getElementById('loggedInMessage').style.display = 'block';
              document.getElementById('welcomeMessage').innerText = `Ești conectat ca ${username}`;
              document.getElementById('login').style.display = 'none';
              document.getElementById('inregistrare').style.display = 'none';
          } else {
              // Dacă token-ul este invalid, afișăm un mesaj în consolă
              console.warn('Token-ul nu este valid. Utilizatorul ar trebui să se reautentifice.');
              // Opțional: poți afișa un mesaj de expirare în interfață
          }
      })
      .catch(error => {
          console.error('Eroare la verificarea token-ului:', error);
      });
  }
}
