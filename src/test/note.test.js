const mongoose = require("mongoose")
const request = require("supertest")
const { app, server } = require("../index")
const api = request(app)

const Note = require("../models/note")

const initialnores = [
  { content: "My new note content 1" },
  { content: "My new note content 2", important: true },
  { content: "My new note content 3" },
]
// antes de comenzar los test
beforeEach(async () => {
  await Note.deleteMany({})
  for (const note of initialnores) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

describe("GET /api/notes", () => {
  test("return todas las notas", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })
  test("las notas deben ser igual a la cantidad inicial de array", async () => {
    const request = await api.get("/api/notes")
    const notes = request.body
    expect(notes).toHaveLength(notes.length)
  })
  test("la nota con un contenido deteminado", async () => {
    const request = await api.get("/api/notes")
    const notes = request.body
    expect(notes[0].content).toBe("My new note content 1")
  })
  test("que alguna nota contenga un contenido en especial", async () => {
    const request = await api.get("/api/notes")
    const content = request.body.map((note) => note.content)

    expect(content).toContain("My new note content 1")
  })
  test("crear una nueva nota", async () => {
    const newNote = {
      content: "My new note content 4",
      important: true,
    }
    const request = await api.post("/api/notes").send(newNote)
    const notes = request.body
    expect(notes.content).toBe("My new note content 4")
  })
})

// se ejecuta cuando se terminan los test
afterAll(() => {
  mongoose.connection.close()
  server.close() // cierra el servidor
})
