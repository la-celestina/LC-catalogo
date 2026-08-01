function renderProductos(productos) {

    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "";

    if (productos.length === 0) {

        contenedor.innerHTML = `
            <div class="sin-resultados">

                <div class="sin-resultados-icono">◇</div>   

                <h2>No encontramos joyas</h2>

                <p>
                    Intenta cambiar la categoría,
                    modificar tu búsqueda o volver
                    al catálogo completo.
                </p>

                <button id="volverTodos" class="btn-volver">
                    Explorar todo el catálogo
                </button>

            </div>
        `;

        document
            .getElementById("volverTodos")
            .addEventListener("click", () => {

                STATE.textoBusqueda = "";
                STATE.categoriaActual = "Todos";

                document.getElementById("busqueda").value = "";

                document
                    .querySelectorAll(".categorias button")
                    .forEach(b => b.classList.remove("activo"));

                document
                    .querySelector('[data-categoria="Todos"]')
                    .classList.add("activo");

                aplicarFiltros();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            });

        return;

    }

    productos.forEach(producto => {

    console.log(producto);

    const card = document.createElement("div");

    card.className = "card";

        card.innerHTML = `
            <img
                src="${CONFIG.IMAGE_FOLDER}${producto.Código}/01.${CONFIG.IMAGE_EXTENSION}"
                alt="${producto.Nombre}"
            >

            <div class="card-body">

                <h3>${producto.Nombre}</h3>

                <p>$ ${Number(producto.Precio).toLocaleString(CONFIG.CURRENCY)}</p>

            </div>
        `;

        // NUEVO
card.onclick = function () {

    abrirProducto(producto);

};

        contenedor.appendChild(card);

    });

}