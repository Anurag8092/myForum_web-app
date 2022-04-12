import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tags = () => {

    const [tagData, setTagData] = useState();

     //Get the note's id which is passed via url as parameter in AllNotes.js
     let search = window.location.search;
     const params = new URLSearchParams(search);
     const tag = params.get("t");

     useEffect(() => {
        // eslint-disable-next-line
        const getTagDetails = async () => {
            //API call
           const response = await fetch(`http://localhost:5000/api/notes/tag/${tag}`,{
             method: "GET",
             headers: {
              "Content-Type": "application/json"
            },
           })
           const tagsNotes = await response.json();
        //    console.log(tagsNotes.note);
           setTagData(tagsNotes.note)
          }
    getTagDetails();
      }, [tag]);


  return (
    <>
    <h1>All Discussions relates to {tag} </h1>
          <div>
         
              {tagData &&
                  tagData?.map((note) => {
                      return (
                          <>
                           <div className="my-3 card row-hover pos-relative py-3 px-3 mb-3 ">
              <div className="row align-items-center">
                <div className="col-md-8 mb-3 mb-sm-0">
                <Link style={{ textDecoration: 'none', fontSize: "1.4rem", }} to={`/viewnote?q=${note?._id}`} className="text-primary">{note?.title}</Link>

                  <p className="text-sm"><span className="op-6">Posted On</span> <span className="text-black" href="#">{note?.timestamp}</span> <span className="op-6">by</span> <span className="text-black" href="#">{note?.userName}</span></p>

                  <p className="description my-4"> <span className="text-black">{note?.description}</span></p>
                </div>
                <div className="col-md-4 op-7">
                </div>
              </div>
            </div>
           </>

                      );

                  })}
          </div>
      </>
  )
 
};

export default Tags;
