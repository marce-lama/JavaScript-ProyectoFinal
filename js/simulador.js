let listaProductos=[]

const pedirDatos = async () => {
    const resp = await fetch("json/data.json")
    const data = await resp.json()
    mostrarProductos(data)
    
}

function mostrarProductos(productos) {
    const contenedorProd = document.querySelector("#grid-principal")
    listaProductos=productos
    listaProductos.forEach(prod => {
        let contenedor = document.createElement("div"); 
        contenedor.innerHTML=`
        <div class="grid-producto">
              <img src="${prod.imagen}" alt="">
              <h6 class="nombre"> ${prod.nombre}</h6>
              <p class="precio"><strong>\$${prod.precio}</strong></p>
              <div class="style-button">
                <button type="button" class="btn btn-success agregar" value=${prod.id}>Agregar</button>
                <button type="button" class="btn btn-danger eliminar" value=${prod.id}>Eliminar</button>
              </div>
        </div>
        `;
        contenedorProd.appendChild(contenedor);
    })
    let btnsAgregar = document.querySelectorAll(".btn.btn-success.agregar")
    let btnsEliminar = document.querySelectorAll(".btn.btn-danger.eliminar")

    btnsAgregar.forEach(btn => {
        btn.addEventListener("click", () => {
        agregarProducto (btn.value)
    })
    });
    
    btnsEliminar.forEach(btn => {
        btn.addEventListener("click", () => {
        eliminarProducto (btn.value)    
        })
    })
}

let listaCarrito = [];
let carrito = JSON.parse(localStorage.getItem("listaCarrito"))
if (carrito != null && carrito.length > 0) {
    listaCarrito = carrito;
}

let span = document.getElementById("span")
span.textContent = listaCarrito.length

let btnMostrarCarrito = document.querySelector(".btn.btn-light.miCarrito")


function agregarProducto (idProducto) {
   let producto = buscarProducto(idProducto);
   listaCarrito.push (producto)
   localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito))
   span.textContent = listaCarrito.length
   Toastify({

    text: "Se agrego producto",
    
    duration: 1500
    
    }).showToast();
}; 

function eliminarProducto (idProducto) {
    idProducto = parseInt(idProducto);
    let posproducto = buscarProducto2(idProducto, listaCarrito);
    if (posproducto != -1) {
    listaCarrito.splice (posproducto, 1)
    localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito)) 
    span.textContent = listaCarrito.length
    Toastify({

        text: "Se elimino producto",
        
        duration: 1500
        
        }).showToast();
    }
}

function buscarProducto (idBuscado) {
    let producto;
    listaProductos.forEach(element => {
        if(element.id == idBuscado) {
            producto = element;
        }  
    });
    return producto; 
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
};

pedirDatos ();













