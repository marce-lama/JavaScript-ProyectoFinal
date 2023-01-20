const listaProductos = [
    {id:1, nombre:"Caja de Alfajores de Maicena x 6 unidades", precio: 953, imagen: "1-maicena.jpg"},
    {id:2, nombre:"Caja de Alfajores de Chocolate con Dulce de Leche x 6 unidades", precio: 976, imagen: "2-choco-dulce-de-leche.jpg"},
    {id:3, nombre:"Caja de Alfajores Blancos con Dulce de Leche x 6 unidades", precio: 937, imagen: "3-blanco-dulce-de-leche.jpg"},
    {id:4, nombre:"Caja de Alfajores de Chocolate con Mousse de Chocolate x 6 unidades", precio: 1155, imagen: "4-mousse.jpg"},
    {id:5, nombre:"Caja de Alfajores Blancos rellenos con Membrillo x 6 unidades", precio: 850, imagen: "5-membrillo.jpg"}, 
    {id:6, nombre:"Caja de Alfajores de Almendra con Dulce de Leche x 6 unidades", precio: 1300, imagen: "6-almendra.jpeg"},
    {id:7, nombre:"Torta Conito de Chocolate con Dulde de Leche", precio: 1500, imagen: "7-torta-conito.jpg"},
    {id:8, nombre:"Caja de Copitos con Chocolate Blanco con Dulce de Leche x 6 unidades", precio: 1000, imagen: "8-conito-blanco.jpeg"},
    {id:9, nombre:"Caja de Copitos de Chocolate con Dulce de Leche x 6 unidades", precio: 1200, imagen: "9-conito-choco.jpeg"},
]


/*const url = "../json/data.json"; 
fetch(url)
.then(res => res.json())
.then(data => mostrarProductos(data))

const contenedorProd = document.querySelector("grid-principal")
function mostrarProductos(productos) {
    productos.forEach(prod => {
        let contenedor = document.createElement("div"); 
        contenedor.innerHTML=`
        <div class="grid-producto">
              <img src="./images/${prod.imagen}" alt="">
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
}
*/

let listaCarrito = [];
let carrito = JSON.parse(localStorage.getItem("listaCarrito"))
if (carrito != null && carrito.length > 0) {
    listaCarrito = carrito;
}

let span = document.getElementById("span")
span.textContent = listaCarrito.length

let grid = document.getElementById("grid-principal")
for (let a of listaProductos){
    let contenedor = document.createElement("div");
    contenedor.innerHTML= `
    <div class="grid-producto">
          <img src="./images/${a.imagen}" alt="">
          <h6 class="nombre"> ${a.nombre}</h6>
          <p class="precio"><strong>\$${a.precio}</strong></p>
          <div class="style-button">
            <button type="button" class="btn btn-success agregar" value=${a.id}>Agregar</button>
            <button type="button" class="btn btn-danger eliminar" value=${a.id}>Eliminar</button>
          </div>
    </div>
    `;
    grid.appendChild(contenedor);
}

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















