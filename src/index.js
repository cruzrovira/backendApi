require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
require("./services/mongoose")

const Note = require("./models/note")

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

app.get("/api/notes/:id", async (req, res) => {
  const id = req.params.id
  try {
    const note = await Note.findById(id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).send({ error: `Note with id ${id} not found` })
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id
  try {
    const note = await Note.findByIdAndRemove(id)
    if (note) {
      res.status(204).end()
    } else {
      res.status(404).send({ error: `Note with id ${id} not found` })
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post("/api/notes", async (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: "content missing" })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.put("/api/notes/:id", async (req, res) => {
  const id = req.params.id

  const { content, important } = req.body
  const note = {
    content: content,
    important: important,
  }
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true })
    res.json(updatedNote)
  } catch (error) {
    res.status(400).send(error)
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
