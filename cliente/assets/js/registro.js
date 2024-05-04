const btnRegistrar = document.getElementById("registrar");

btnRegistrar.addEventListener("click", async function (event) {
  event.preventDefault();

  try {

    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;
    const passV = document.getElementById("passV").value;
    const years = document.getElementById("years").value;
    const esp = document.getElementById("especialidad").value;
    const foto = document.getElementById("foto").files[0]; // Obtener el archivo seleccionado
  
    const formData = new FormData();
    formData.append("email", email);
    formData.append("nombre", name);
    formData.append("password", pass);
    formData.append("years", years);
    formData.append("esp", esp);
    formData.append("foto", foto);
  
    var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (regexCorreo.test(email)) {
      console.log("El correo electrónico es válido.");
    } else {
      alert("El correo electrónico no es válido.");
    }
    const response = await fetch("http://localhost:3030/registro/usuario", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log("data", data);

    if (data.status == "ok") {
      console.log("Registro agregado correctamente.");
      window.location.href = "Login.html";
    } else {
      console.log("Error al registrar:", data.error);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
});
