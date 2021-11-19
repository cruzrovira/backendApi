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

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id
  Note.findById(id).then((note) => {
    if (note) {
      res.json(note)
    }
    res.status(404).send({ error: `Note with id ${id} not found` })
  })
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id
  Note.findByIdAndRemove(id).then((note) => {
    if (note) {
      res.status(204).end()
    } else {
      res.status(404).send({ error: `Note with id ${id} not found` })
    }
  })
})

app.post("/api/notes", (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: "content missing" })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then((savedNote) => {
    res.json(savedNote)
  })
})

app.put("/api/notes/:id", (req, res) => {
  const id = req.params.id

  const { content, important } = req.body
  const note = {
    content: content,
    important: important,
  }

  Note.findByIdAndUpdate(id, note, { new: true }).then((updatedNote) => {
    res.json(updatedNote)
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
