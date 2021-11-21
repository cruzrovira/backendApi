require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
require("./services/mongoose")

const noteMiddleware = require("./middleware/noteMiddleware")

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use("/api/notes", noteMiddleware)

app.use((req, res) => {
  res.status(404).send({ error: "Not found" })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
