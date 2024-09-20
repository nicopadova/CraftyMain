const listaProd = document.getElementById('listaProd');
let totaleOrdine = 0;
const token = localStorage.getItem('authToken');
let ordineCreato;
let nomeUtente;
let cognomeUtente;
let telefonoUtente;
let emailUtente;
let indirizzoUtente;
let passwordUtente;
let roleUtente;
let idUtente;
let carrelloArray;
let prezzoArray=[];
const srcMap=document.getElementById('mappaMaps')
const nomeSpedizione = document.getElementById('nomeSpedizione');
let indirizzoSpedizione1 = document.getElementById('indirizzoSpedizione1');
let indirizzoSpedizione2 = document.getElementById('indirizzoSpedizione2');
const numeroTelefono = document.getElementById('numeroTelefono');


async function getCarrello() {
    const token = localStorage.getItem('authToken');

    console.log("MY TOKEN:", token);
    if (token) {
        try {
            const response = await fetch('http://localhost:8080/user/me', {
                method: 'GET',
                headers: {
                    'Authorization': token // Use "Bearer" if the server requires it
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                let carrellostring = data.carrello;
                nomeUtente = data.nome;
                cognomeUtente = data.cognome;
                telefonoUtente = data.telefono;
                emailUtente = data.email;
                indirizzoUtente = data.indirizzo;
                passwordUtente = data.password;
                roleUtente = data.role;
                idUtente = data.id;
                console.log('idutente' + idUtente);
                numeroTelefono.innerHTML = data.telefono
                nomeSpedizione.innerHTML = data.nome + ' '+ data.cognome
                const stringIndirizzo = data.indirizzo 
                const arrayIndirizzo = stringIndirizzo.split(',')
                let indirizzo1=arrayIndirizzo[0].trimStart()
                let indirizzo2=arrayIndirizzo[1].trimStart()
                indirizzoSpedizione1.innerHTML = indirizzo1.charAt(0).toUpperCase() + indirizzo1.slice(1);
                indirizzoSpedizione2.innerHTML = indirizzo2.charAt(0).toUpperCase() + indirizzo2.slice(1);
                srcMap.setAttribute("src", `https://www.google.com/maps/embed/v1/place?q=${data.indirizzo}&key=AIzaSyAbzdg6Mcg_TSX8mEx4JuvJb5hjYb9I9Mg`)

                if (data.carrello == null || data.carrello == '') {
                    console.log('AAAAAAAAAAAAAAAAAAAA');
                    window.location.replace('/profiloUtente.html');
                } else {
                    console.log('BBBBBBBBBBBBBBBBBBB');
                    carrelloArray = carrellostring.split(',');
                    console.log('Array' + carrelloArray);
                    for (let i = 0; i < carrelloArray.length; i++) {
                        let prodottoarray = carrelloArray[i].split(':');
                        console.log(prodottoarray);
                        let carrelloId = prodottoarray[0];
                        console.log(carrelloId);
                        let carrelloQnt = prodottoarray[1];
                        console.log(carrelloQnt);
                        loadProd(carrelloId, carrelloQnt);
                    }

                    // Call addOrder and wait for it to complete before calling addDetails
                    await addOrder();  // Add await here
                    await addDetails(ordineCreato); // Now this will only be called after ordineCreato is set
                    svuotaCarrello(); // This will run after addDetails has finished
                }
            }
        } catch (error) {
            console.error('Error during fetching user data:', error);
        }
    }
}


function loadProd(Prodid, ProdQnt) {
    console.log(telefonoUtente)
    const url = `http://localhost:8080/product/${Prodid}`
        fetch(url)
            .then(res => res.json())
            .then(prod => {
                prezzoArray.push(prod.prezzo)
                const tr = document.createElement('tr')
                const imgString = prod.img
                imgArray = imgString.split(",")
                tr.innerHTML = `
    <td>
       <div class="d-flex mb-2">
            <div class="flex-shrink-0"> <img
                    src="assets\\img\\products\\${imgArray[0]}" alt="" width="35" class="img-fluid"></div>
            <div class="flex-lg-grow-1 ms-3">
                <h6 class="small mb-0"><a href="Prodotto.html?id=${prod.id}" class="text-reset TESTO">${prod.nome}</a></h6>
            </div>
       </div>
    </td>
    <td>${ProdQnt}</td>
    <td class="text-end">€ ${parseFloat(prod.prezzo * ProdQnt).toFixed(2)}</td>`
                listaProd.appendChild(tr)
                totaleOrdine = totaleOrdine + (prod.prezzo * ProdQnt)
                document.getElementById('Subtotale').innerHTML = `€ ${ parseFloat(totaleOrdine).toFixed(2) }`
                document.getElementById('Totale').innerHTML = `€ ${ parseFloat(totaleOrdine).toFixed(2) }`
            })

}


async function addOrder() {
    const date = new Date();
    const ordine = {
        stato: "In lavorazione",
        user: { id: idUtente },
        data: date
    };

    try {
        const response = await fetch('http://localhost:8080/ordine', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ordine)
        });

        const ordineData = await response.json();
        ordineCreato = ordineData.id;
        console.log('Ordine creato:' + ordineCreato);
    } catch (error) {
        console.error('Errore durante l\'aggiunta dell\'ordine:', error);
    }
}

// Updated addDetails function to be async
async function addDetails(idOrdine) {
    for (let i = 0; i < carrelloArray.length; i++) {
        let prodottoarray = carrelloArray[i].split(':');
        console.log(prodottoarray);
        let carrelloId = prodottoarray[0];
        console.log(carrelloId);
        let carrelloQnt = prodottoarray[1];
        console.log(carrelloQnt);

        const dettagli = {
            product: { id: carrelloId },
            qnt: carrelloQnt,
            user: { id: idUtente },
            ordine: { id: idOrdine },
            prezzo: prezzoArray[i]
        };
        console.log(dettagli);

        try {
            // Await each fetch to ensure the loop waits for each request to complete
            await fetch('http://localhost:8080/orderDetails', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dettagli)
            });
        } catch (error) {
            console.error('Errore durante l\'aggiunta dettagli:', error);
        }
    }
}

// Your new function that you want to run after addDetails
function svuotaCarrello() {
    console.log("This function runs after addDetails has completed.");
    fetch(`http://localhost:8080/user/${idUtente}`, {
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
        }),
    });
}
