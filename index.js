const selectPais = document.getElementById("paisSelect");
const mainContainer = document.querySelector(".main");

// Función para obtener los datos de la API
function cambioAPI(apiUrl, pais) {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      mainContainer.innerHTML = ""; // Limpiar contenido anterior

      // 🔹 Ajustamos la estructura según el país
      let datos = [];

      if (pais === "bra") {
        // La API de Brasil usa "nome", "compra" y "venda"
        datos = data.map(d => ({
          nombre: d.nome,
          compra: d.compra,
          venta: d.venda
        }));
      } else if (pais === "bol" || pais === "mex") {
        // La API de Bolivia y México devuelve un objeto, lo convertimos en array
        datos = [data]; // Metemos el objeto dentro de un array
      } else {
        // Para el resto, asumimos que data ya es un array
        datos = data;
      }

      // 🔹 Generamos las cards con la estructura corregida
      datos.forEach(dolar => {
        const card = document.createElement("div");
        card.classList.add("main-card");

        card.innerHTML = `
          <h2 class="main-card__title">${dolar.nombre}</h2>
          <div class="main-card__details">
            <div class="main-card__info-item">
              <span class="main-card__info-label">Compra</span>
              <span class="main-card__info-value">$${dolar.compra}</span>
            </div>
            <div class="main-card__info-item">
              <span class="main-card__info-label">Venta</span>
              <span class="main-card__info-value">$${dolar.venta}</span>
            </div>
          </div>
        `;

        mainContainer.appendChild(card);
      });
    })
    .catch(error => console.error("Error al obtener los datos:", error));
}

// Mapeo de URLs según el país seleccionado
const apis = {
  arg: "https://dolarapi.com/v1/dolares",
  bra: "https://br.dolarapi.com/v1/cotacoes",
  bol: "https://bo.dolarapi.com/v1/dolares/oficial",
  chi: "https://cl.dolarapi.com/v1/cotizaciones",
  mex: "https://mx.dolarapi.com/v1/cotizaciones/usd",
  uru: "https://uy.dolarapi.com/v1/cotizaciones"
};

// Evento para detectar cambios en el <select>
selectPais.addEventListener("change", () => {
  const paisSeleccionado = selectPais.value;
  cambioAPI(apis[paisSeleccionado], paisSeleccionado);
});

// Cargar datos por defecto (Argentina)
cambioAPI(apis["arg"], "arg");
