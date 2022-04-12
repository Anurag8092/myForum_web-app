import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate()
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes();
    }
    else{
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };
  const handleSubmit = (e) => {
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click();
      props.showAlert("Note Successfully Edited", "success")
  }

  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <form>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
    <label htmlFor="tag">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required />

  </div>
</form>

      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleSubmit} type="button" className="btn btn-primary" >Update Note</button>
      </div>
    </div>
  </div>
</div>
      {/* Display All Notes */}
    
      <div className="row my-3">
        <h2>Your Questions</h2>
        <div className='container'>
        {notes.length===0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        }) 
      }
      </div>
    </>
  );
};

export default Notes;
