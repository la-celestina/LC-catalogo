document.addEventListener("DOMContentLoaded", async () => {

    STATE.productos = await cargarCSV();

    STATE.productosFiltrados = [...STATE.productos];

    renderProductos(STATE.productosFiltrados);

    inicializarBuscador();

    inicializarCategorias();

    //====================================
    // ABRIR PRODUCTO DESDE LA URL
    //====================================

    const codigo = window.location.hash.replace("#", "");

    if(codigo){

        const producto = STATE.productos.find(
            p => p.Código === codigo
        );

        if(producto){

            abrirProducto(producto);

        }

    }

});