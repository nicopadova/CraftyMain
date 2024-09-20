header = document.getElementsByTagName('header')[0]
footer = document.getElementsByTagName('footer')[0]

function loadTemplate() {
  header.innerHTML = `
    <div class="lg_header">
      <section class="layout">
        <div><a href="Home.html"><img class="w-75 h-auto" src="assets/img/icons/logocrafty.png" alt=""></a></div>
        <div class="w-100">
          <div class="custom_input w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="svg_icon bi-search" viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
              </path>
            </svg>
            <form id="formLg" action="" class="w-100">
              <input class="input" type="text" id="barLg" placeholder="">
            </form>
          </div>
        </div>
        <div class="text-end">
          <i class="fa-solid fa-user fa-2xl" style="color: #b68125;" data-bs-toggle="modal"
            data-bs-target="#myModal"></i>
        </div>
        <div class="text-end">
          <a href="Carrello.html"><i class="fa-solid fa-cart-shopping fa-2xl" style="color: #b68125" ;></i></a>
        </div>
      </section>

      <div class="container">
        <div class="row  justify-content-center mt-4 ">
          <ul class="nav col-12  mb-2 justify-content-center align-items-center mb-md-0 d-flex flex-nowrap">
            <a class="btn btn-lg rounded-pill ms-3" href="Catalogo.html?category=1" role="button">
              Arredamento
            </a>
            <a class="btn btn-lg rounded-pill mx-3" href="Catalogo.html?category=2" role="button">
              Gioielli
            </a>
            <a class="btn btn-lg rounded-pill mx-3" href="Catalogo.html?category=3" role="button">
              Abiti Uomo
            </a>
            <a class="btn btn-lg rounded-pill mx-3" href="Catalogo.html?category=4" role="button">
              Abiti Donna
            </a>
            <a class="btn btn-lg rounded-pill me-3" href="Catalogo.html?category=7" role="button">
              Giocattoli
            </a>
          </ul>
        </div>
      </div>
    </div>

    <div class="sm_header">
      <div class="container container-fluid text-center ">
        <div class="row justify-content-evenly align-items-center">
          <div class="col-4">
            <a href="Home.html"><img class="w-100 h-100" src="assets/img/icons/logocrafty.png" alt=""></a>
          </div>
          <div class="col-2">
            <i class="fa-solid fa-user fa-2xl" style="color: #b68125;" data-bs-toggle="modal"
              data-bs-target="#myModal"></i>
          </div>
          <div class="col-2">
            <a href="Carrello.html"><i class="fa-solid fa-cart-shopping fa-2xl" style="color: #b68125" ;></i></a>
          </div>
          <div class="col-2">
            <div class="dropdown">
              <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i
                  class="fa-solid fa-bars fa-2xl" style="color: #b68125"></i></a>
              <ul class="dropdown-menu dropdown-menu-lg-end my-4" style="color: #2F3D14;">
                <li><a class="dropdown-item" href="Catalogo.html?category=1">Arredamento</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="Catalogo.html?category=2">Gioielli</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="Catalogo.html?category=3">Abiti Uomo</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="Catalogo.html?category=4">Abiti Donna</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="Catalogo.html?category=7">Giocattoli</a></li>
              </ul>
            </div>

          </div>
          <div class="col-11">
            <div class="custom_input w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="svg_icon bi-search" viewBox="0 0 16 16">
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                </path>
              </svg>
              <form action="" id="formSm" class="w-100">
                <input class="input" type="text" id="barSm" placeholder="">
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="main-accesso">
              <input class="input-accesso" type="checkbox" id="chk" aria-hidden="true">

              <div class="signup" id="signup-section">
                <div id="form-signup">
                  <form onsubmit="signup(event)">
                    <label class="label-accesso" for="chk" aria-hidden="true">Registrati</label>
                    <div id="utente-fields">
                      <input class="input-accesso" id="nome-signup" type="text" name="nome" placeholder="Nome"
                        required="">
                      <input class="input-accesso" id="cognome-signup" type="text" name="cognome" placeholder="Cognome"
                        required="">
                      <input class="input-accesso" id="telefono-signup" type="tel" name="telefono"
                        placeholder="Telefono" required="">
                      <input class="input-accesso" id="email-signup" type="email" name="email" placeholder="Email"
                        required="">
                      <input class="input-accesso" id="re-email-signup" type="email" name="confirm_email"
                        placeholder="Conferma Email" required="">
                      <input class="input-accesso" id="password-signup" type="password" name="pswd"
                        placeholder="Password" required="">
                        <small id="passwordHelp" class="form-text text-muted" 
       style="display: flex; align-items: center; justify-content: center; text-align: center;">
    La password deve contenere almeno 6 caratteri.
</small>
                      <input class="input-accesso" id="re-password-signup" type="password" name="confirm_pswd"
                        placeholder="Conferma Password" required="">
                      <input class="input-accesso" id="indirizzo-signup" type="text" name="indirizzo"
                        placeholder="Indirizzo" required="">
                    </div>
                    <button class="tasto-accesso" type="submit">Registrati</button>
                  </form>
                </div>
                <p id="message-signup"></p>
                <pre id="userData"></pre>
                <p id="message-profile"></p>
                <button class="tasto-accesso" id="logout-section" onclick="logout(event)"
                  style="display: none;">Logout</button>

                <p id="message"></p>
              </div>

              <div class="login" id="login-section">
                <form onsubmit="login(event)">
                  <label class="label-accesso" for="chk" aria-hidden="true">Accedi</label>
                  <input class="input-accesso" id="email" type="email" name="email" placeholder="Email" required="">
                  <input class="input-accesso" id="password" type="password" name="pswd" placeholder="Password"
                    required="">
                  <a class="password-dimenticata" href="#">Password dimenticata</a>
                  <button class="tasto-accesso" type="submit">Accedi</button>
                </form>
                <p id="message-login"></p>
              </div>

              <!-- Logout Button (Initially hidden) -->

            </div>
          </div>
        </div>
      </div>
    </div>
    `

  footer.innerHTML = `
    <div class="row row-cols-2 row-cols-md-4 pt-4 footer_tab">
      <div class="col-3 mb-3 align-self-center text-center">
        <a href="#" class="mb-3 " id="tornasu">
          <i class="fa-solid fa-circle-arrow-up fa-2xl" style="color: #b68125;"></i>
        </a>
      </div>

      <div class="col mb-3">
        <h5 class="titolofooter">Area personale</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="Carrello.html" class="nav-link p-0 ">Carrello</a></li>
          <li class="nav-item mb-2"><a href="" class="nav-link p-0" " data-bs-toggle="modal"
            data-bs-target="#myModal">Profilo</a></li>
        </ul>
      </div>

      <div class="col mb-3">
        <h5 class="titolofooter">Info</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="FAQ.html" class="nav-link p-0 ">FAQ</a></li>
          <li class="nav-item mb-2"><a href="LavoraConNoi.html" class="nav-link p-0 ">Lavora con noi</a></li>

        </ul>
      </div>

      <div class="col mb-3">
        <h5 class="titolofooter">Chi Siamo</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="Chi-Siamo.html" class="nav-link p-0 ">Scopri Crafty</a></li>
          <li class="nav-item mb-2"><a href="Contattaci.html" class="nav-link p-0 ">Contatti</a></li>
        </ul>
      </div>
    </div>


    <div>
      <div class="d-flex flex-wrap justify-content-between align-items-center py-3  border-top">
        <div class="col-md-4 d-flex align-items-center mx-4">
          <span class="mb-3 mb-md-0 ">© 2024 Crafty, Inc</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled mx-4">
          <li class="ms-3"><i class="fa-brands fa-square-facebook fa-2xl" style="color: #b68125;"></i></li>
          <li class="ms-3"><i class="fa-brands fa-square-x-twitter fa-2xl" style="color: #b68125;"></i></li>
          <li class="ms-3"><i class="fa-brands fa-square-instagram fa-2xl" style="color: #b68125;"></i></li>
        </ul>
      </div>
      `
  //   document.getElementById('tipo_utente').addEventListener('change', function() {
  //     const utenteFields = document.getElementById('utente-fields');
  //     const aziendaFields = document.getElementById('azienda-fields');
  //     if (this.value === 'utente') {
  //         utenteFields.classList.remove('hidden');
  //         aziendaFields.classList.add('hidden');
  //     } else if (this.value === 'azienda') {
  //         aziendaFields.classList.remove('hidden');
  //         utenteFields.classList.add('hidden');
  //     } else {
  //         utenteFields.classList.add('hidden');
  //         aziendaFields.classList.add('hidden');
  //     }
  // });
  checkLoginStatus();
  getUserData();
  loadForms();
}


function checkLoginStatus() {
  const token = localStorage.getItem('authToken');
  const loginSection = document.getElementById('login-section');
  const logoutSection = document.getElementById('logout-section');
  const signupSection = document.getElementById('form-signup');

  if (token) {
    // User is logged in
    loginSection.style.display = 'none';
    signupSection.style.display = 'none';
    logoutSection.style.display = 'block';
  } else {
    // User is not logged in
    loginSection.style.display = 'block';
    signupSection.style.display = 'block';
    logoutSection.style.display = 'none';
  }
}

async function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageElementLogin = document.getElementById('message-login');
  const loginSection = document.getElementById('login-section');
  const logoutSection = document.getElementById('logout-section');
  const signupSection = document.getElementById('form-signup');

  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('authToken', token);
      messageElementLogin.textContent = 'Login successful';
      messageElementLogin.style.color = 'green';
      loginSection.style.display = 'none';
      signupSection.style.display = 'none';
      logoutSection.style.display = 'block';
      // Ricarica la pagina per aggiornare l'interfaccia utente
      window.location.reload();
    } else {
      messageElementLogin.textContent = 'Invalid credentials';
      messageElementLogin.style.color = '#66141B';
      messageElementLogin.style.textAlign = 'center'
    }
  } catch (error) {
    console.error('Error during login:', error);
    messageElementLogin.textContent = 'Error during login';
    messageElementLogin.style.color = 'red';
  }
}

async function getUserData() {
  const token = localStorage.getItem('authToken');
  const messageElementProfile = document.getElementById('message-profile');
  console.log("MY TOKEN:", token);
  if (token) {
    try {
      const response = await fetch('http://localhost:8080/user/me', {
        method: 'GET',
        headers: {
          'Authorization': token // Usa "Bearer" se il server lo richiede
        },
        // mode: 'cors' // Cambiato da 'no-cors' a 'cors'
      });

      if (response.status === 200) {
        const data = await response.json();
        //         document.getElementById('userData').innerHTML = `
        // <div class="">

        // <div class="container">
        //     <div class="row justify-content-center">
        //         <div class="col-md-6">
        //             <div class="profile-container text-center">
        //                 <i class="fas fa-user-circle profile-icon mb-4"></i>
        //                 <h3 class="profile-title mb-4">Profilo Utente</h3>
        //                 <p><strong>Nome:</strong> Mario</p>
        //                 <p><strong>Cognome:</strong> Rossi</p>
        //                 <p><strong>Email:</strong> mario.rossi@email.com</p>
        //                 <p><strong>Indirizzo:</strong> Via Roma 123, 00100 Roma, Italia</p>
        //                 <p><strong>Telefono:</strong> +39 012 345 6789</p>
        //                 <div class="d-grid">
        //                     <a href="#" class="btn profile-btn mt-3">Modifica Profilo</a>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // </div>`;
        // Mostra i messaggi se l'utente è loggato
        if (data.role == "ADMIN") {
          messageElementProfile.innerHTML = `<div class="profile-container text-center">
                 <i class="fas fa-user-circle profile-icon mb-4"></i>
                 <h3 class="profile-title mb-4">Profilo Utente</h3>
                 <p><strong>Nome:</strong> ${data.nome}</p>
                 <p><strong>Cognome:</strong> ${data.cognome}</p>
                 <p><strong>Email:</strong> ${data.email}</p>
                 <p><strong>Indirizzo:</strong> ${data.indirizzo}</p>
               <p><strong>Telefono:</strong> ${data.telefono}</p>
                 <div class="d-grid">
                 
                     <a role="button" href="profiloUtente.html" class="tasto-accesso tasto-modifica-profilo" id="edit-profile">Profilo personale</a>
                     <a role=button href="PagAmministratore.html" class="tasto-accesso tasto-modifica-profilo" id="edit-profile">Pannello Amministratore</a>
                </div>
           </div>`;
           messageElementProfile.style.color = 'green';
        } else {
          messageElementProfile.innerHTML = `<div class="profile-container text-center">
                 <i class="fas fa-user-circle profile-icon mb-4"></i>
                 <h3 class="profile-title mb-4">Profilo Utente</h3>
                 <p><strong>Nome:</strong> ${data.nome}</p>
                 <p><strong>Cognome:</strong> ${data.cognome}</p>
                 <p><strong>Email:</strong> ${data.email}</p>
                 <p><strong>Indirizzo:</strong> ${data.indirizzo}</p>
               <p><strong>Telefono:</strong> ${data.telefono}</p>
                 <div class="d-grid">
                 
                     <a role="button" href="profiloUtente.html" class="tasto-accesso tasto-modifica-profilo" id="edit-profile">Profilo personale</a>
                </div>
           </div>`;
          messageElementProfile.style.color = 'green';
        }
      } else {
        messageElementProfile.textContent = 'Failed to get user data';
        messageElementProfile.style.color = 'red';
      }
    } catch (error) {
      console.error('Error during fetching user data:', error);
      messageElementProfile.innerHTML = 'Error during fetching user data';
      messageElementProfile.style.color = 'red';
    }
  } //else {
  //   // Nascondi i messaggi o mostra un messaggio di avviso
  //   messageElement.textContent = 'Devi essere loggato per vedere i messaggi';
  //   messageElement.style.color = 'orange';
  // }
}

// window.onload = getUserData;




async function logout(event) {
  event.preventDefault();
  const token = localStorage.getItem('authToken');
  const messageElement = document.getElementById('message');
  const logoutSection = document.getElementById('logout-section');
  const loginSection = document.getElementById('login-section');
  const signupSection = document.getElementById('form-signup');

  try {
    const response = await fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      localStorage.removeItem('authToken');
      messageElement.textContent = 'Logout successful';
      messageElement.style.color = 'green';
      logoutSection.style.display = 'none';
      loginSection.style.display = 'block';
      signupSection.style.display = 'block';
      window.location.replace("Home.html");
    } else {
      messageElement.textContent = 'Error during logout';
      messageElement.style.color = 'red';
    }
  } catch (error) {
    console.error('Error during logout:', error);
    messageElement.textContent = 'Error during logout';
    messageElement.style.color = 'red';
  }
}
async function signup(event) {
  event.preventDefault();

  const nomeSignup = document.getElementById('nome-signup').value;
  const cognomeSignup = document.getElementById('cognome-signup').value;
  const telefonoSignup = document.getElementById('telefono-signup').value;
  const emailSignup = document.getElementById('email-signup').value;
  const reEmailSignup = document.getElementById('re-email-signup').value;
  const passwordSignup = document.getElementById('password-signup').value;
  const rePasswordSignup = document.getElementById('re-password-signup').value;
  const indirizzoSignup = document.getElementById('indirizzo-signup').value;

  const messageElementSignup = document.getElementById('message-signup');

  // Verifica che le email e le password corrispondano
  if (emailSignup !== reEmailSignup) {
    messageElementSignup.textContent = 'Le email non corrispondono';
    messageElementSignup.style.color = 'red';
    return;
  }

  if (passwordSignup !== rePasswordSignup) {
    messageElementSignup.textContent = 'Le password non corrispondono';
    messageElementSignup.style.color = 'red';
    return;
  }
  if (passwordSignup.length < 6) {
    messageElementSignup.textContent = 'La password è troppo corta';
    messageElementSignup.style.color = 'red';
    return;
  }
  try {
    const response = await fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nomeSignup,
        cognome: cognomeSignup,
        telefono: telefonoSignup,
        email: emailSignup,
        password: passwordSignup,
        indirizzo: indirizzoSignup,
        role: "utente"  // Role predefinito
      }),
    });
    console.log(JSON.stringify({
      nome: nomeSignup,
      cognome: cognomeSignup,
      telefono: telefonoSignup,
      email: emailSignup,
      password: passwordSignup,
      indirizzo: indirizzoSignup,
      role: "utente"  // Role predefinito
    }));
    if (response.status === 200) {
      window.location.reload();
    } else {
      messageElementSignup.textContent = 'Dati non validi';
      messageElementSignup.style.color = 'red';
    }
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    messageElementSignup.textContent = 'Errore durante la registrazione';
    messageElementSignup.style.color = 'red';
  }
}

function loadForms() {
  const formLg = document.getElementById('formLg')
  const formSm = document.getElementById('formSm')
  const barLg = document.getElementById('barLg')
  const barSM = document.getElementById('barSm')
  formLg.addEventListener('submit', function (event) {
    event.preventDefault();
    window.location.href = `Catalogo.html?search=${barLg.value}`
  })
  formSm.addEventListener('submit', function (event) {
    event.preventDefault();
    window.location.href = `Catalogo.html?search=${barSM.value}`
  })
}


