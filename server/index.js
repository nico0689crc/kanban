const app = require("./src/app");

app.listen(
  process.env.NODE_LOCAL_PORT, 
  () => console.log("Server running on port: " + process.env.NODE_LOCAL_PORT)
);  

  


    
