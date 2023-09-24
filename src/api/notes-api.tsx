import { Note } from "../pages/NoteLists";

export async function fetchNotes() {
  const res = await fetch("http://localhost:3000/notes");
  return res.json();
}

export async function fetchNote(id: string) {
  const res = await fetch(`http://localhost:3000/notes/${id}`);
  return res.json();
}

export async function createNote(newNote: Note) {
  const res = await fetch(`http://localhost:3000/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
  return res.json();
}

export async function updateNote(updatedNote: Note) {
  const res = await fetch(`http://localhost:3000/notes/${updatedNote.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });
  return res.json();
}
