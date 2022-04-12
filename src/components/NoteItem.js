import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (

        <><div className="my-3 card row-hover pos-relative py-3 px-3 mb-3 ">
        <div className="row align-items-center">
          <div className="col-md-8 mb-3 mb-sm-0">
            <h3>
              <Link style={{ textDecoration: 'none' }} to={`/viewnote?q=${note._id}`} className="text-primary">{note.title}</Link>
            </h3>
            <p className="text-sm"><span className="op-6">Posted On</span> <span className="text-black" href="#">{note.timestamp}</span> <span className="op-6">by</span> <span className="text-black" href="#">{note.userName}</span></p>

            <p className="description my-2"> <span className="text-black">{note.description}</span></p>
            <div className="text-sm op-5"> <Link to={`/tag/?t=${note.tag}`} className="text-black mr-2" href="#">#{note.tag}</Link> </div>
          </div>
          <div className="col-md-4 op-7">
            <div className="row text-center op-7">
              <div className="col px-1">
                   <i className="ion-ios-chatboxes-outline icon-1x"></i> <span className="d-block text-sm">{note.replies.length} Replies</span> 
                   <i className="fas fa-trash" onClick={() => { deleteNote(note._id); props.showAlert("Note Successfully Deleted", "success"); } }></i>
                  <i className="fas fa-edit mx-2" onClick={() => { updateNote(note); } }></i>
                   </div>
              

            </div>
          </div>
        </div>
      </div>
            </>
    )
}

export default NoteItem
