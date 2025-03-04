import app from "./app";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("Database connection failed:", error));
