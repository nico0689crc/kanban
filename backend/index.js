const app = require('./src/app');
const { initDatabase } = require('./src/database/database');

initDatabase()
  .then(() => {
    app.listen(
      process.env.BACKEND_CONTAINER_PORT,
      () => console.log(`Server running on port: ${process.env.BACKEND_CONTAINER_PORT}`),
    );
  })
  .catch((error) => {
    console.log(error);
  });
