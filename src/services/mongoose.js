const mongoose = require("mongoose")

mongoose
  .connect(process.env.URL_NotesDB)
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
