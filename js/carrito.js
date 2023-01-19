let totalCarrito = 0; 
let tbody = document.querySelector("#lCarrito")   
    let carrito = JSON.parse(localStorage.getItem("listaCarrito"))
    if(carrito != null) {
    for (let a of carrito) {
        let contenedor = document.createElement("tr"); 
        contenedor.innerHTML = `
        <th scope="row">${a.id}</th>
        <td>${a.nombre}</td>
        <td><a href=""><img width="25" height="25" class="deleteProducto" src="../images/Delete.png" alt=""></a></td>
        <td>\$${a.precio}</td>
        `
        tbody.appendChild(contenedor)
        span.textContent = carrito.length;
        totalCarrito += a.precio
    };
}
    document.querySelector("#totalCarrito").innerText="$" + totalCarrito; 

function mostrarCarrito () {
};


let eliminarCarrito = document.querySelector(".imagenDelete")
    eliminarCarrito.addEventListener("click", () => {
    localStorage.removeItem("listaCarrito");
});


let formaPago = document.querySelector(".formaPagoMenu")
let cuotasPago = document.querySelector(".formaPagoCuotas")
let importeFinal = 0.0;
    formaPago.addEventListener("change", (event) => {
    document.querySelector(".totalFormaPago").style.display="block";
    if (event.target.value == "-1") {
        document.querySelector(".totalFormaPago").style.display="none";
    }
    if (event.target.value == "4") {
        cuotasPago.style.display="block"
        document.querySelector(".totalFormaPago").style.display="none";
    } else {
        cuotasPago.style.display="none"
       importeFinal = importeTotal(event.target.value)
       document.querySelector(".totalFormaPago").innerText="Su total a pagar sera de $"+importeFinal;
    }
    }); 

    cuotasPago.addEventListener("change", (event) => {
    document.querySelector(".totalFormaPago").style.display="block";
    if(event.target.value == "-1"){
        document.querySelector(".totalFormaPago").style.display="none";
    }
    importeFinal = importeTotalConRecargo(event.target.selectedOptions[0].getAttribute('data-recargo'))
    document.querySelector(".totalFormaPago").innerText="Su total a pagar sera de $"+importeFinal;
    }); 

    

function importeTotal (tipoPago) {
    let valorFinal = 0.0; 
    switch (tipoPago) {
        case "1":  
            valorFinal = totalCarrito
            break;
        case "2":
            valorFinal = totalCarrito * 0.90
            break;
        case "3":
            valorFinal = totalCarrito
            break;       
        default:
            break;
    }
    return valorFinal.toFixed(2);
}

function importeTotalConRecargo (recargo) {
    let totalConRecargo = totalCarrito * parseFloat(recargo);
    return totalConRecargo.toFixed(2); 
}

