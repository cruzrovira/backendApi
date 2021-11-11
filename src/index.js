const express = require("express")
const app = express()
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
]

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/api/notes", (req, res) => {
  res.json(notes)
})

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).send({ error: `Note with id ${id} not found` })
  }
})

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

app.post("/api/notes", (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: "content missing" })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: notes.length + 1,
  }
  notes.push(note)
  res.json(note)
})

app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)
  const index = notes.indexOf(note)
  console.log(note, index)

  const { content, important } = req.body

  if (note) {
    note.content = content
    note.important = important || false
    notes[index] = note
    res.json(note)
  } else {
    res.status(404).send({ error: `Note with id ${id} not found` })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
