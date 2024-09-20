const url = new URL(window.location.href);
const idParam = url.searchParams.get('id');
const listaProd = document.getElementById('listaProd')
const stato=document.getElementById('stato')
const srcMap=document.getElementById('mappaMaps')
const nomeSpedizione = document.getElementById('nomeSpedizione');
let indirizzoSpedizione1 = document.getElementById('indirizzoSpedizione1');
let indirizzoSpedizione2 = document.getElementById('indirizzoSpedizione2');
const numeroTelefono = document.getElementById('numeroTelefono');
const spedizione= document.getElementById('spedizione')
const br=document.getElementById('br')


let totaleOrdine = 0
const token = localStorage.getItem('authToken')
let ordineCreato
let nomeUtente
let cognomeUtente
let telefonoUtente
let emailUtente
let indirizzoUtente
let passwordUtente
let roleUtente
let idUtente
let carrelloArray

async function getOrdine() {
    const token = localStorage.getItem('authToken');
    console.log("MY TOKEN:", token);
    if (token) {
        try {
            const response = await fetch(`http://localhost:8080/orderDetails/searchByOrderId?ordine_id=${idParam}`, {
                method: 'GET',
                headers: {
                    'Authorization': token // Usa "Bearer" se il server lo richiede
                },
                // mode: 'cors' // Cambiato da 'no-cors' a 'cors'
            });

            
                const data = await response.json();
                stato.innerHTML=`- n.${idParam} (${data[0].ordine.stato})`
                srcMap.setAttribute("src", `https://www.google.com/maps/embed/v1/place?q=${data[0].user.indirizzo}&key=AIzaSyAbzdg6Mcg_TSX8mEx4JuvJb5hjYb9I9Mg`)
                numeroTelefono.innerHTML = data[0].user.telefono
                nomeSpedizione.innerHTML = data[0].user.nome + ' ' + data[0].user.cognome
                const stringIndirizzo = data[0].user.indirizzo 
                console.log('Stringa '+stringIndirizzo)

                if (data[0].ordine.stato != 'Spedito' && data[0].ordine.stato != 'Consegnato'){
                    const list = spedizione.classList;
                    list.add("d-none");
                    const list2= br.classList
                    list2.toggle("d-none")
                }

                const arrayIndirizzo = stringIndirizzo.split(',')
                let indirizzo1=arrayIndirizzo[0].trimStart()
                let indirizzo2=arrayIndirizzo[1].trimStart()
                indirizzoSpedizione1.innerHTML = indirizzo1.charAt(0).toUpperCase() + indirizzo1.slice(1);
                indirizzoSpedizione2.innerHTML = indirizzo2.charAt(0).toUpperCase() + indirizzo2.slice(1);
                console.log('0'+arrayIndirizzo[0])
                console.log('1'+arrayIndirizzo[1])
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    const tr = document.createElement('tr')
                    const imgString = data[i].product.img
                    let imgArray = imgString.split(",")
                    tr.innerHTML = `
                    <td>
                       <div class="d-flex mb-2">
                            <div class="flex-shrink-0"> <img
                                    src="assets\\img\\products\\${imgArray[0]}" alt="" width="35" class="img-fluid"></div>
                            <div class="flex-lg-grow-1 ms-3">
                                <h6 class="small mb-0"><a href="Prodotto.html?id=${data[i].product.id}" class="text-reset TESTO">${data[i].product.nome}</a></h6>
                            </div>
                       </div>
                    </td>
                    <td>${data[i].qnt}</td>
                    <td class="text-end">€ ${parseFloat(data[i].prezzo * data[i].qnt).toFixed(2)}</td>`
                    listaProd.appendChild(tr)
                    totaleOrdine = totaleOrdine + (data[i].prezzo * data[i].qnt)
                    document.getElementById('Subtotale').innerHTML = `€ ${ parseFloat(totaleOrdine).toFixed(2) }`
                    document.getElementById('Totale').innerHTML = `€ ${ parseFloat(totaleOrdine).toFixed(2) }`
                


            }
        } catch (error) {
            console.error('Error during fetching user data:', error);

        }

    }
}


