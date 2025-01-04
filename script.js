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











  



  

