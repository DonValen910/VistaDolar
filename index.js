fetch("https://dolarapi.com/v1/dolares")
  .then(res => res.json())
  .then(data => {
    const mainContainer = document.querySelector(".main");

    data.forEach(dolar => {
      const card = document.createElement("div");
      card.classList.add("main-card");

      card.innerHTML = `
        <h2 class="main-card__title">${dolar.nombre}</h2>
        <div class="main-card__details">
          <div class="main-card__info-item">
            <span class="main-card__info-label">Compra</span>
            <span class="main-card__info-value">${dolar.compra}</span>
          </div>
          <div class="main-card__info-item">
            <span class="main-card__info-label">Venta</span>
            <span class="main-card__info-value">${dolar.venta}</span>
          </div>
        </div>
      `;

      mainContainer.appendChild(card);
    });
  })
  .catch(error => console.error("Error al obtener los datos:", error));
