const app  = require("./src/app");
const SERVER_PORT = 3030;

app.listen(SERVER_PORT, () => {
  console.log(
    `El servidor se inició correctamente en el puerto: ${SERVER_PORT}`
  );
});
