export async function fetchNotes() {
  const res = await fetch("http://localhost:3000/notes");
  return res.json();
}
