import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

    //Fetch all Notes(Specific User)
    const getNotes = async () => {
      //API call
      try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json();
        
        setNotes(json);
      } catch (error) {
        console.log(error);
      }
     
    };

    //Display All Notes(All users)
    const displayallnotes = async () => {
      //API call
      try {
        const response = await fetch(`${host}/api/notes/displayallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        // console.log(response);
        const json = await response.json()
        setNotes(json);
      } catch (error) {
        console.log(error);
      }
     
    };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag})
      });
      //Logic for adding a new note
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.log(error);
    }
    
    
  };

  

  //Delete a Note
  const deleteNote = async (id) => {
    //TODO: API Call
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json()
  
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
    
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    try{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      });
      const json = await response.json();
      console.log(json);
      let newNotes = JSON.parse(JSON.stringify(notes))
  
      //Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
        
      }
      setNotes(newNotes);
    }
    catch(error){
      console.log(error);
    }

  };


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, displayallnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
