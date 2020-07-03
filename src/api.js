const API_URL = 'http://127.0.0.1:8000/';

export async function getNotes() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export async function addNotes(data) {

  console.log(data)
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.log('Error', error))
  .then(response => console.log('Success:', response, data));

}

export async function deleteNote(noteId) {

  const path =`${API_URL}${noteId}`;

  fetch(path, {
    method: 'DELETE'
  }).then(res => res.json())
  .catch(error => console.log('Error', error))
  .then(response => console.log('Success:', response, data));

}