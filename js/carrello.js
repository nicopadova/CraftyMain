const listaCarrello = document.getElementById('listaCarrello')
let totaleCarrello = 0
let nomeUtente;
let cognomeUtente;
let telefonoUtente;
let emailUtente;
let indirizzoUtente;
let passwordUtente;
let roleUtente;
let idUtente;


async function getCarrello() {
    const token = localStorage.getItem('authToken');

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
                let carrellostring = data.carrello
                nomeUtente = data.nome
                cognomeUtente = data.cognome
                telefonoUtente = data.telefono
                emailUtente = data.email
                indirizzoUtente = data.indirizzo
                passwordUtente = data.password
                roleUtente = data.role
                idUtente = data.id
                console.log('idutente' + idUtente)

                let carrelloArray = carrellostring.split(',')
                for (let i = 0; i < carrelloArray.length; i++) {
                    let prodottoarray = carrelloArray[i].split(':')
                    console.log(prodottoarray)
                    let carrelloId = prodottoarray[0]
                    console.log(carrelloId)
                    let carrelloQnt = prodottoarray[1]
                    console.log(carrelloQnt)
                    loadProd(carrelloId, carrelloQnt)

                }

            }


        } catch (error) {
            console.error('Error during fetching user data:', error);

        }

    } else {
        const div = document.createElement('div')
        div.classList = 'text-danger'
        div.innerHTML = `<h3>Accedi per visualizzare il carrello</h3>`
        listaCarrello.appendChild(div)
    }
}



function loadProd(id, qnt) {
    const url = `http://localhost:8080/product/${id}`
    fetch(url)
        .then(res => res.json())
        .then(prod => {
            totaleCarrello = totaleCarrello + (prod.prezzo * qnt)


            console.log('totale ' + totaleCarrello)
            const imgString = prod.img
            const imgArray = imgString.split(",")
            console.log(imgArray)

            const div = document.createElement('div')
            div.classList = "card card-tutta rounded-3 mb-4"
            div.id = prod.id
            div.innerHTML = `<div class="card-body p-4">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                                <img src="assets\\img\\products\\${imgArray[0]}"
                                    class="img-fluid rounded-3" alt="#!"> <!--Collegamento img carrello-->
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                                <a href="Prodotto.html?id=${prod.id}" class="lead fw-normal mb-2 titoloOgg text-decoration-none">${prod.nome}</a>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                                    onclick="this.parentNode.querySelector('input[type=number]').stepDown(),updateCarrello()">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input  min="1" max="99" name="quantity" value="${qnt}" type="number"
                                    class="form-control form-control-sm w-50" />

                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                                    onclick="this.parentNode.querySelector('input[type=number]').stepUp(),updateCarrello()">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mt-3">
                                <h5 class="mb-0 titoloOgg">${parseFloat(prod.prezzo * qnt).toFixed(2)} €</h5>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a href="#!" class="text-danger" onclick="removeItem(this),updateCarrello()"><i
                                        class="fas fa-trash fa-lg"></i></a>
                            </div>
                        </div>
                    </div>`
            listaCarrello.appendChild(div)
            document.getElementById('totaleCarrello').innerHTML = `${parseFloat(totaleCarrello).toFixed(2)} €`
        })
}


function updateCarrello() {
    const IDs = document.getElementsByClassName('card-tutta')
    const quantities = document.getElementsByName('quantity')
    const qntArray = []
    const idArray = [];
    const newCarrello = []

    for (let i = 0; i < IDs.length; i++) {
        idArray.push(IDs[i].id);
    }

    quantities.forEach((quantity) => {
        if (quantity.value !== undefined) {
            qntArray.push(quantity.value);
        }
    });
    console.log('array id' + idArray);
    console.log('array qnt' + qntArray);

    for (let i = 0; i < idArray.length; i++){
        const prodCarrello=`${idArray[i]}:${qntArray[i]}`
        newCarrello.push(prodCarrello)
    }

    console.log('Array carrello:'+newCarrello.toString())

     const token = localStorage.getItem('authToken');
     console.log("MY TOKEN:", token);
     if (token && idUtente) { // Verifica che l'ID utente sia disponibile
         try {
             const response =  fetch(`http://localhost:8080/user/${idUtente}`, {
                 method: 'PUT',
                 headers: {
                     'Authorization': token,
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                     nome: nomeUtente,
                     cognome: cognomeUtente,
                     telefono: telefonoUtente,
                     email: emailUtente,
                     indirizzo: indirizzoUtente,
                     password: passwordUtente,
                     role: roleUtente,
                     carrello: newCarrello.toString()
                 }),
             });
         } catch (error) {
             console.error('Errore durante l\'aggiornamento del profilo:', error);
         }
 
     }
     location.reload(); 
}