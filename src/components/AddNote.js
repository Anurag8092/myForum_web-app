import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    
    const handleSubmit = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({title: "", description: "", tag: ""})
      props.showAlert("Note Successfully Added", "success")
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div>
                        <div className='container my-3'>
            <h1>Post a Question</h1>
            <form>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title}   onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
    <label htmlFor="tag">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required />

  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className=" my-3 btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
</div>
        </div>
    )
}    

export default AddNote
