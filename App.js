import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const NoteItem = ({ text }) => {
  return <Text style={styles.note}>{text}</Text>;
};

const NotesList = ({ notes }) => {
  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => <NoteItem text={item.text} />}
      keyExtractor={item => item.key}
    />
  );
};

const AddNoteForm = ({ onAddNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Digite sua nota"
        value={newNote}
        onChangeText={setNewNote}
      />
      <Button title="Adicionar Nota" onPress={handleAddNote} />
    </View>
  );
};

export default function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (noteText) => {
    const newNote = { key: Math.random().toString(), text: noteText };
    setNotes([...notes, newNote]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Notas</Text>

      <AddNoteForm onAddNote={addNote} />
      
      <NotesList notes={notes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  note: {
    fontSize: 18,
    marginTop: 10,
  },
});
