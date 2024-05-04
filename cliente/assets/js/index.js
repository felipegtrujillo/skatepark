let skaters = [];

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:3030/registro/public", {
    method: "GET",
  });

  const data = await response.json();

  if (data.status == "ok") {
    console.log("result", data.result);

    skaters = data.result;
    console.log("skaters", skaters);

    renderizaSkaters(skaters);
    // Obtener elementos del formulario por su ID
    id = data.result[0].id;
  } else {
    console.log("Error ingresar:", data.error);
  }
});

function renderizaSkaters(skaters) {
  const tableBody = document.querySelector(".table tbody");

  skaters.forEach((skater) => {
    const newRow = document.createElement("tr");

    const idCell = document.createElement("th");
    idCell.setAttribute("scope", "row");
    idCell.textContent = skater.id;
    newRow.appendChild(idCell);

    const fotoCell = document.createElement("td");
    fotoCell.innerHTML = `<div></div>`; // Aquí puedes agregar la imagen si tienes la URL en el objeto skater
    const imagenElement = document.createElement("img");
    imagenElement.src = skater.foto;
    imagenElement.alt = "Imagen del skater"; //
    fotoCell.appendChild(imagenElement);
    newRow.appendChild(fotoCell);

    const nombreCell = document.createElement("td");
    nombreCell.textContent = skater.nombre;
    newRow.appendChild(nombreCell);

    const anosExperienciaCell = document.createElement("td");
    anosExperienciaCell.textContent = skater.anos_experiencia;
    newRow.appendChild(anosExperienciaCell);

    const especialidadCell = document.createElement("td");
    especialidadCell.textContent = skater.especialidad;
    newRow.appendChild(especialidadCell);

    const estadoCell = document.createElement("td");

    if (skater.estado) {
      estadoCell.classList.add("text-success", "font-weight-bold"); // Clases de Bootstrap
      estadoCell.textContent = "Aprobado";
    } else {
      estadoCell.classList.add("text-warning", "font-weight-bold"); // Clases de Bootstrap
      estadoCell.textContent = "En revision";
    }

    newRow.appendChild(estadoCell);

    tableBody.appendChild(newRow);
  });
}
