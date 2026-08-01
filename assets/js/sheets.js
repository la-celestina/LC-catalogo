async function cargarCSV() {

    const respuesta = await fetch(CONFIG.SHEET_URL);

    const texto = await respuesta.text();

    const resultado = Papa.parse(texto, {

        header: true,

        skipEmptyLines: true

    });

    return resultado.data;

}