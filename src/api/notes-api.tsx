export async function fetchNotes() {
  const res = await fetch("http://localhost:3000/notes");
  return res.json();
}

export async function fetchNote(id: string) {
  const res = await fetch(`http://localhost:3000/notes/${id}`);
  return res.json();
}
