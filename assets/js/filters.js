function aplicarFiltros() {

    let productos = [...STATE.productos];

    // Filtro por categoría
    if (STATE.categoriaActual !== "Todos") {

        productos = productos.filter(producto =>
            producto.Categoría === STATE.categoriaActual
        );

    }

    // Filtro por búsqueda
    if (STATE.textoBusqueda !== "") {

        productos = productos.filter(producto =>
            producto.Nombre
                .toLowerCase()
                .includes(STATE.textoBusqueda)
        );

    }

    STATE.productosFiltrados = productos;

    renderProductos(STATE.productosFiltrados);

}