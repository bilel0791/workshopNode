const fs = require('fs');


// Function to read the notes from the JSON file
const readNotes = () => {
  try {
    const notesData = fs.readFileSync('notes.json', 'utf8');
    return JSON.parse(notesData);
  } catch (error) {
    return [];
  }
};
console.log(readNotes());


// Function to write the notes to the JSON file
const writeNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes), 'utf8');
};

// Function to list all notes
const listNotes = () => {
  const notes = readNotes();
  if (notes.length === 0) {
    console.log('No notes found.');
  } else {
    console.log('Your notes:');
    notes.forEach((note) => {
      console.log(`Name: ${note.name}`);
      console.log(`Note: ${note.note}`);
      console.log('------');
    });
  }
};
console.table(listNotes());

// Function to add a new note
const addNote = (name, note) => {
  const notes = readNotes();
  const newNote = {
    name: name,
    note: note,
  };
  notes.push(newNote);
  writeNotes(notes);
  console.log('Note added successfully.');
};

// Function to remove a single note
const removeNote = (name) => {
  const notes = readNotes();
  const updatedNotes = notes.filter((note) => note.name !== name);
  if (notes.length === updatedNotes.length) {
    console.log('Note not found.');
  } else {
    writeNotes(updatedNotes);
    console.log('Note removed successfully.');
  }
};

// Function to read a single note
const readNote = (name) => {
  const notes = readNotes();
  const note = notes.find((note) => note.name === name);
  if (note) {
    console.log(`name: ${note.name}`);
    console.log(`note: ${note.note}`);
  } else {
    console.log('Note not found.');
  }
};

// Command line argument handling
const command = process.argv[2];

if (command === 'list') {
  listNotes();
} else if (command === 'add') {
  const name = process.argv[3];
  const note = process.argv[4];
  addNote(name, note);
} else if (command === 'remove') {
  const name = process.argv[3];
  removeNote(name);
} else if (command === 'read') {
  const name = process.argv[3];
  readNote(name);
} else {
  console.log('Invalid command. Please use one of the following commands:');
  console.log('node main.js list');
  console.log('node main.js add <name> <note>');
  console.log('node main.js remove <name>');
  console.log('node main.js read <name>');
}
