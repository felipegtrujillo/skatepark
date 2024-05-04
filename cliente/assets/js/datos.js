const btnActualizar = document.getElementById("actualizar");
const btnEliminar = document.getElementById("eliminar");

let id = null;

const token = sessionStorage.getItem("jwtToken");

document.addEventListener("DOMContentLoaded", async function () {
  const datosLogin = [];

  const response = await fetch("http://localhost:3030/registro", {
    method: "GET",
    headers: { Authorization: token },
  });

  const data = await response.json();

  if (data.status == "ok") {
    console.log("result", data);

    console.log("datosLogin", datosLogin);
  } else {
    console.log("Error ingresar:", data.error);
  }

  // Obtener elementos del formulario por su ID
  id = data.result[0].id;
  const email = (document.getElementById("email").value = data.result[0].email);
  const nombre = (document.getElementById("name").value =
    data.result[0].nombre);
  const password = (document.getElementById("password").value =
    data.result[0].password);
  const confirmPassword = (document.getElementById("passwordR").value =
    data.result[0].password);
  const years = (document.getElementById("years").value =
    data.result[0].anos_experiencia);
  const especialidad = (document.getElementById("especialidad").value =
    data.result[0].especialidad);

  // Ejemplo de cómo acceder y mostrar el valor de cada input
  console.log("id:", id);
  console.log("Email:", email);
  console.log("Nombre:", nombre);
  console.log("Password:", password);
  console.log("Confirmar Password:", confirmPassword);
  console.log("Años de experiencia:", years);
  console.log("Especialidad:", especialidad);
});

btnActualizar.addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    const email = document.getElementById("email").value;
    const nombre = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("passwordR").value;
    const years = document.getElementById("years").value;
    const especialidad = document.getElementById("especialidad").value;

    console.log("ID", id);

    const response = await fetch("http://localhost:3030/registro", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        id: id,
        email: email,
        nombre: nombre,
        password: password,
        years: years,
        especialidad: especialidad,
      }),
    });

    const data = await response.json();

    console.log("data", data);

    if (data.status == "ok") {
      console.log("Inicio de session correcto");
      window.location.href = "Datos.html";
      sessionStorage.setItem(data.tokenName, data.token);
      datosLogin = data.resultado;

      console.log("datosLogin", datosLogin);
    } else {
      console.log("Error ingresar:", data.error);
    }
  } catch (error) {
    console.error("Error", error);
  }
});

btnEliminar.addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    const email = document.getElementById("email").value;
    const nombre = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("passwordR").value;
    const years = document.getElementById("years").value;
    const especialidad = document.getElementById("especialidad").value;

    console.log("ID", id);

    const response = await fetch(`http://localhost:3030/registro?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    console.log("data", data);

    if (data.status == "ok") {
      console.log("eliminado correctamente");
      alert("eliminado correctamente");
      window.location.href = "../index.html";
      sessionStorage.setItem(data.tokenName, data.token);
      datosLogin = data.resultado;

      console.log("datosLogin", datosLogin);
    } else {
      console.log("Error ingresar:", data.error);
    }
  } catch (error) {
    console.error("Error", error);
  }
});
