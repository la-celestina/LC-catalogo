function inicializarCategorias() {

    const botones = document.querySelectorAll(".categorias button");

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            botones.forEach(b => b.classList.remove("activo"));

            boton.classList.add("activo");

            STATE.categoriaActual = boton.dataset.categoria;

            aplicarFiltros();

        });

    });

    const botonTodos = document.querySelector('[data-categoria="Todos"]');

    botonTodos.classList.add("activo");

}