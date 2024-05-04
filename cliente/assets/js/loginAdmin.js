const btnIngresar = document.getElementById("ingresarAdmin");

btnIngresar.addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3030/login/admin", {
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
      window.location.href = "Admin.html";
      sessionStorage.setItem(data.tokenName, data.token);
      const datosLogin = data.resultado;

      console.log("datosLogin", datosLogin);
    } else {
      console.log("Error ingresar:", data.error);
    }
  } catch (error) {
    console.error("Error", error);
  }
});
