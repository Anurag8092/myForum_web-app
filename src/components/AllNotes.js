
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";


const AllNotes = () => {
    const context = useContext(noteContext);
    const { notes, displayallnotes } = context;
    // console.log(context);
    useEffect(() => {
        displayallnotes();
      // eslint-disable-next-line
    }, []);
  return <>
    <div className="row my-3">
       <h1>Discussions</h1>
        
        
        <div className='container'>
        {notes.length===0 && "No Notes to display"}
        </div>

        
          {
            
             
        notes.map((note) => {
       
         
          return (


            <><div className="card row-hover pos-relative py-3 px-3 mb-3">
              <div className="row align-items-center">
                <div className="col-md-8 mb-3 mb-sm-0">
                  <h5>
                    <Link style={{ textDecoration: 'none' }} to={`/viewnote?q=${note._id}`} className="text-primary">{note.title}</Link>
                  </h5>
                  <p className="text-sm"><span className="op-6">Posted On</span> <span className="text-black" href="#">{note.timestamp}</span> <span className="op-6">by</span> <span className="text-black" href="#">{note.userName}</span></p>
                  <div className="text-sm op-5"> <Link to={`/tag/?t=${note.tag}`} className="text-black mr-2" href="#">#{note.tag}</Link> </div>
                </div>
                <div className="col-md-4 op-7">
                  <div className="row text-center op-7">
                    <div className="col px-1"> <i className="ion-ios-chatboxes-outline icon-1x"></i> <span className="d-block text-sm">{note.replies.length} Replies</span> </div>
                  </div>
                </div>
              </div>
            </div>
              </>
            

          );
      })
      }
      
      </div>
  </>;
};

export default AllNotes;
