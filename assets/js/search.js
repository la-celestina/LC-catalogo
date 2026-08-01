function inicializarBuscador() {

    const input = document.getElementById("busqueda");

    input.addEventListener("input", (e) => {

        STATE.textoBusqueda = e.target.value.toLowerCase();

        aplicarFiltros();

    });

}