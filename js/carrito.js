let carrito = [];
let totalCarrito = 0;
function armarTablaCarrito () { 
let tbody = document.querySelector("#lCarrito")   
    carrito = JSON.parse(localStorage.getItem("listaCarrito"))
    if(carrito != null) {
    for (let a of carrito) {
        let contenedor = document.createElement("tr"); 
        contenedor.innerHTML = `
        <th scope="row">${a.id}</th>
        <td>${a.nombre}</td>
        <td><a href=""><img width="25" height="25" class="deleteProducto" id=${a.id} src="../images/Delete.png" alt=""></a></td>
        <td>\$${a.precio}</td>
        `
        tbody.appendChild(contenedor)
        span.textContent = carrito.length;
        totalCarrito += a.precio
    };
}
    document.querySelector("#totalCarrito").innerText="$" + totalCarrito; 
}
armarTablaCarrito();
function mostrarCarrito () {
};


let eliminarCarrito = document.querySelector(".imagenDelete")
    eliminarCarrito.addEventListener("click", () => {
    localStorage.removeItem("listaCarrito");
});

let borrarProducto = document.querySelectorAll(".deleteProducto")
    borrarProducto.forEach(element => {
        element.addEventListener("click", (event)=> {
            eliminarProducto(event.target.id);
        })
    });
    
let formaPago = document.querySelector(".formaPagoMenu")
let cuotasPago = document.querySelector(".formaPagoCuotas")
let importeFinal = 0.0;
    formaPago.addEventListener("change", (event) => {
    document.querySelector(".totalFormaPago").style.display="block";
    if (event.target.value == "-1") {
        document.querySelector(".totalFormaPago").style.display="none";
        document.querySelector(".formularioPago").style.display="none";
    }
    if (event.target.value == "4") {
        cuotasPago.style.display="block"
        document.querySelector(".totalFormaPago").style.display="none";
        document.querySelector(".formularioPago").style.display="none";
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
        document.querySelector(".formularioPago").style.display="none";
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

let irAPago = document.querySelector(".irAPagar")
irAPago.addEventListener("click", ()=> {
    let formaPagoMenu = document.querySelector(".formaPagoMenu")
    let formaPagoCuotas = document.querySelector(".formaPagoCuotas")
    if(formaPagoMenu.options[formaPagoMenu.selectedIndex].value == "-1" || (formaPagoMenu.options[formaPagoMenu.selectedIndex].value == "4" && formaPagoCuotas.options[formaPagoCuotas.selectedIndex].value == "-1")) {
        Swal.fire('Seleccione un metodo de pago correcto')
    } else {
        document.querySelector(".formularioPago").style.display="block"
    }
}); 

let btnFinalizar = document.querySelector(".btnFinalizar")
    btnFinalizar.addEventListener("click", limpiarCarrito)

function limpiarCarrito () {
    limpiarFormulario();
    document.querySelector(".formularioPago").style.display="none" 
    localStorage.removeItem("listaCarrito")
    let tabla = document.getElementById("lCarrito")
    tabla.innerHTML="";
    let numeroCarrito = document.getElementById("span")
    numeroCarrito.innerText = 0;
    totalCarrito=0;
    document.querySelector(".totalFormaPago").style.display="none"
    armarTablaCarrito();
}

let btnPago = document.querySelector(".btnPagar")
    btnPago.addEventListener("click", () => {
        formularioObligatorio()
    })

function obtenerInputs () {
        let nombre = document.getElementById("Nombre").value;
        let apellido = document.getElementById("Apellido").value;
        let email = document.getElementById("E-mail").value; 
        document.querySelector(".modal1").innerText="Gracias por su Compra " + nombre + " " + apellido + "!"
        document.querySelector(".modal2").innerText="Su pago se realizo con exito!!!"
        document.querySelector(".modal3").innerText="En breve recibira un mail en la casilla de correo " + email + " con el detalle del pedido"
        document.querySelector(".btnFinalizar").style.display="block"
    }

function formularioObligatorio () {
        if(document.getElementById("Nombre").value == "" || document.getElementById("Apellido").value == "" || document.getElementById("Documento").value == "" || document.getElementById("E-mail").value == "" || document.getElementById("Direccion").value == "" || document.getElementById("Localidad").value == "" || document.getElementById("Telefono").value == "") {
        document.querySelector(".modal1").innerText="Campos Incompletos"
        document.querySelector(".modal2").innerText="Por favor complete todos los campos del formulario"
        document.querySelector(".btnFinalizar").style.display="none"
        } else obtenerInputs ();
}

function limpiarFormulario () {
    document.getElementById("Nombre").value = "";
    document.getElementById("Apellido").value = "";
    document.getElementById("Documento").value = "";
    document.getElementById("E-mail").value = "";
    document.getElementById("Direccion").value = "";
    document.getElementById("Localidad").value = "";
    document.getElementById("Telefono").value = "";
}



function eliminarProducto (idProducto) {
    idProducto = parseInt(idProducto);
    let posproducto = buscarProducto2(idProducto, carrito);
    if (posproducto != -1) {
    carrito.splice (posproducto, 1)
    localStorage.setItem("listaCarrito", JSON.stringify(carrito)) 
    span.textContent = carrito.length
    Toastify({

        text: "Se elimino producto",
        
        duration: 1500
        
        }).showToast();
    }
}

function buscarProducto2 (idBuscado, lista) {
    let contador = -1; 
    let posicionEncontrada = -1;
    lista.forEach(element => {
        contador ++; 
        if(element.id == idBuscado) {
        posicionEncontrada = contador; 
        }  
    });
    return posicionEncontrada
}
