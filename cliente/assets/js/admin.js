let skaters = [];
const btnActualizar = document.getElementById("Actualizar");

const token = sessionStorage.getItem("jwtToken");

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:3030/registro/public", {
    method: "GET",
  });

  const data = await response.json();

  if (data.status == "ok") {
    skaters = data.result;
    console.log("skaters", skaters);

    renderizaSkaters(skaters);
    // Obtener elementos del formulario por su ID
  } else {
    console.log("Error ingresar:", data.error);
  }
});

btnActualizar.addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    console.log("skaters array", skaters);

    const newArray = skaters.map((skater) => {
      return { id: skater.id, estado: skater.estado };
    });

    const response = await fetch("http://localhost:3030/registro/admin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ array: newArray }),
    });

    const data = await response.json();

    console.log("data", data);

    if (data.status == "ok") {
      console.log("Actualizacion correcta");
    } else {
      console.log("Error al actualizar:", data.error);
    }
  } catch (error) {
    console.error("Error", error);
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
    fotoCell.innerHTML = `<div></div>`; // Agrega la imagen si tienes la URL en el objeto skater
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
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.disabled = false; // Deshabilitar el checkbox para que no sea editable
    checkbox.checked = skater.estado; // Establecer el estado del checkbox según el valor booleano

    // Agregar evento de cambio al checkbox
    checkbox.addEventListener("change", function () {
      skater.estado = this.checked; // Actualizar el estado en el arreglo skaters cuando cambia el checkbox
    });

    // Agregar el checkbox al TD
    estadoCell.appendChild(checkbox);

    // Agregar la clase según el estado booleano
    if (skater.estado) {
      estadoCell.classList.add("checkbox", "checked");
    } else {
      estadoCell.classList.add("checkbox", "unchecked");
    }

    newRow.appendChild(estadoCell);

    tableBody.appendChild(newRow);
  });
}
