const btnIngresar = document.getElementById("ingresar");

btnIngresar.addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regexCorreo.test(email)) {
      console.log("El correo electrónico es válido.");
    } else {
      alert("El correo electrónico no es válido.");
    }

    const response = await fetch("http://localhost:3030/login/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();

    console.log("data", data);

    if (data.status == "ok") {
      console.log("Inicio de session correcto");
      window.location.href = "Datos.html";
      sessionStorage.setItem(data.tokenName, data.token);
      const datosLogin = data.resultado;

      console.log("datosLogin", datosLogin);
    } else {
      alert("Credenciales Incorrectas");
      console.log("Error ingresar:", data.error);
    }
  } catch (error) {
    console.error("Error", error);
  }
});
