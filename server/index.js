const app = require("./src/app");
const { initDatabase } = require("./src/database/database");

initDatabase()
  .then(() => {
    app.listen(
      process.env.NODE_PORT, 
      () => console.log("Server running on port: " + process.env.NODE_PORT)
    );  
  })
  .catch((error) => {
    console.log(error);
  });