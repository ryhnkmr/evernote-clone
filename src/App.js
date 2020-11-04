import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor' 
import SidebarItemComponent from './sidebaritem/sidebarItem' 
import './App.css';
import { firestore } from './plugins/firebase';
import Button from '@material-ui/core/Button';
import { Divider, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { MonochromePhotosTwoTone, Today } from '@material-ui/icons';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    }
  }
  render() {
    return(
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}></SidebarComponent>
          {
            this.state.selectedNote ? 
            <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}></EditorComponent>
            : null
          }
        
      </div>
    )
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        this.setState({ notes: notes});
      });
  }

  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note })
  }

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    }
    const newFromDB = await firebase
    .firestore()
    .collection('notes')
    .add({
      title: note.title,
      body: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp() 
    });

    const newId = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note]})
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id == newId)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], slecetedNoteIndex: newNoteIndex });
  }
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({notes: this.state.notes.filter(_note => _note !== note)});

    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null })
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.slecetedNoteIndex - 1) : 
      this.setState({ selectedNoteIndex: null, selectedNote: null })
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }
}

export default App;