/*
========================================
LC CATALOG
product.js

Versión 1.0 Base

Controla la ficha del producto.

========================================
*/


//========================================
// ABRIR PRODUCTO
//========================================

function abrirProducto(producto){

    STATE.productoSeleccionado = producto;

    window.location.hash = producto.Código;

    const contenedor =
        document.getElementById("overlay-container");

    contenedor.innerHTML = crearModal(producto);

    document.body.style.overflow = "hidden";

    inicializarEventos();

}



//========================================
// CREAR MODAL
//========================================

function crearModal(producto){

    return `

        <div
            class="modal-overlay"
            id="productoOverlay">

            <div class="modal">

                <button
                    class="cerrar-modal"
                    id="cerrarProducto">

                    ×

                </button>

                ${crearGaleria(producto)}

                ${crearInformacion(producto)}

            </div>

        </div>

    `;

}



//========================================
// CREAR GALERÍA
//========================================

function crearGaleria(producto){

    const ruta =
        `${CONFIG.IMAGE_FOLDER}${producto.Código}/`;

    return `

        <div class="modal-imagen">

            <img
                id="imagenPrincipal"
                src="${ruta}01.${CONFIG.IMAGE_EXTENSION}"
                alt="${producto.Nombre}">

            <div class="miniaturas">

                ${crearMiniatura(ruta,1,true)}

                ${crearMiniatura(ruta,2)}

                ${crearMiniatura(ruta,3)}

                ${crearMiniatura(ruta,4)}

            </div>

            <div class="logo-modal">

    <img
        src="assets/images/logo-gold.png"
        alt="La Celestina Gold">

</div>

        </div>

    `;

}



//========================================
// CREAR MINIATURA
//========================================

function crearMiniatura(ruta,numero,activa=false){

    return `

        <img

            class="miniatura ${activa ? "activa" : ""}"

            src="${ruta}${String(numero).padStart(2,"0")}.${CONFIG.IMAGE_EXTENSION}"

            onclick="cambiarImagen(this)"

            onerror="this.remove()">

    `;

}

//========================================
// CREAR INFORMACIÓN
//========================================

function crearInformacion(producto){

    return `

        <div class="modal-info">

            <h2>${producto.Nombre}</h2>

            <p class="codigo">

                REF. ${producto.Código}

            </p>

            <p class="descripcion">

                ${producto["Descripción"] || ""}

            </p>

            ${crearFichaTecnica(producto)}

            <p class="precio">

                $ ${Number(producto.Precio).toLocaleString(CONFIG.CURRENCY)}

            </p>

            ${crearBotonWhatsApp(producto)}

            ${crearBotonesCompartir()}

</div>

    `;

}


//========================================
// BOTONES COMPARTIR
//========================================

function crearBotonesCompartir(){

    return `

        <div class="acciones-producto">

            <button
                class="btn-secundario"
                onclick="copiarEnlace()">

                🔗 Copiar enlace

            </button>

            <button
                class="btn-secundario"
                onclick="compartirProducto()">

                📤 Compartir

            </button>

        </div>

    `;

}


//========================================
// CREAR FICHA TÉCNICA
//========================================

function crearFichaTecnica(producto){

    return `

        <div class="ficha-tecnica">

            ${crearFilaFicha("Material", producto.Material)}

            ${crearFilaFicha("Color", producto.Color)}

            ${crearFilaFicha("Piedra", producto.Piedra)}

            ${crearFilaFicha("Tipo", producto["Tipo de cierre"])}

        </div>

    `;

}



//========================================
// CREAR FILA
//========================================

function crearFilaFicha(titulo, valor){

    // No mostrar la fila si no tiene información
    if(
        !valor ||
        valor.trim() === "" ||
        valor.trim().toUpperCase() === "NA"
    ){
        return "";
    }

    return `

        <div>

            <strong>${titulo}</strong>

            <span>${valor}</span>

        </div>

    `;

}



//========================================
// CREAR BOTÓN WHATSAPP
//========================================

function crearBotonWhatsApp(producto){

    return `

        <button
            class="btn-whatsapp"
            onclick="consultarWhatsApp('${producto.Código}','${producto.Nombre}')">

            💬 Consultar por WhatsApp

        </button>

    `;

}


//========================================
// INICIALIZAR EVENTOS
//========================================

function inicializarEventos(){

    document
        .getElementById("cerrarProducto")
        .addEventListener("click", cerrarProducto);

    document
        .getElementById("productoOverlay")
        .addEventListener("click", function(e){

            if(e.target.id === "productoOverlay"){

                cerrarProducto();

            }

        });

}



//========================================
// CAMBIAR IMAGEN
//========================================

function cambiarImagen(miniatura){

    const imagenPrincipal =
        document.getElementById("imagenPrincipal");

    imagenPrincipal.style.opacity = "0";

    setTimeout(function(){

        imagenPrincipal.src = miniatura.src;

        imagenPrincipal.onload = function(){

            imagenPrincipal.style.opacity = "1";

        };

    },150);

    document
        .querySelectorAll(".miniatura")
        .forEach(function(img){

            img.classList.remove("activa");

        });

    miniatura.classList.add("activa");

}



//========================================
// CONSULTAR WHATSAPP
//========================================

function consultarWhatsApp(codigo, nombre){

    const producto = STATE.productoSeleccionado;

    const telefono = "573117123378"; // Cambia por tu número

    let mensaje = producto["WhatsApp"] || "";

    mensaje = mensaje
        .replaceAll("{CODIGO}", producto.Código)
        .replaceAll("{NOMBRE}", producto.Nombre)
        .replaceAll("{PRECIO}", "$ " + Number(producto.Precio).toLocaleString(CONFIG.CURRENCY));

    const url =
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

}

//========================================
// COPIAR ENLACE
//========================================

async function copiarEnlace(){

    try{

        await navigator.clipboard.writeText(window.location.href);

        mostrarToast("✓ Enlace copiado");

    }catch(e){

        mostrarToast("No fue posible copiar el enlace");

    }

}



//========================================
// COMPARTIR
//========================================

async function compartirProducto(){

    if(navigator.share){

        await navigator.share({

            title: document.title,

            text: "Mira esta joya de La Celestina Gold.",

            url: window.location.href

        });

    }else{

        copiarEnlace();

    }

}

//========================================
// TOAST
//========================================

function mostrarToast(texto){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = texto;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

        toast.classList.add("mostrar");

    });

    setTimeout(() => {

        toast.classList.remove("mostrar");

        setTimeout(() => {

            toast.remove();

        },300);

    },2000);

}

//========================================
// CERRAR PRODUCTO
//========================================

function cerrarProducto(){

    history.replaceState(
    "",
    document.title,
    window.location.pathname
);

    STATE.productoSeleccionado = null;

    document.body.style.overflow = "";

    const contenedor =
        document.getElementById("overlay-container");

    if(contenedor){

        contenedor.innerHTML = "";

    }

}



//========================================
// UTILIDADES
//========================================

function obtenerRutaProducto(producto){

    return `${CONFIG.IMAGE_FOLDER}${producto.Código}/`;

}



//========================================
// FIN DEL ARCHIVO
//========================================  