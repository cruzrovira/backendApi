const mongoose = require("mongoose")

const MONGO_DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_DB_URL_START
    : process.env.MONGO_DB_URL_DEV

mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected")
  })
  .catch((err) => {
    console.log(err)
  })

// desconecta la base de datos cuando se cierra el servidor de node js
process.on("uncaughtException", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    )
    process.exit(0)
  })
})
