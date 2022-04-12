import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ViewNote = () => {
    const [questionData, setQuestionData] = useState();
    const [reply, setReply] = useState("");
    
    //Get the note's id which is passed via url as parameter in AllNotes.js
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const noteId = params.get("q");

    useEffect(() => {
    // eslint-disable-next-line
    const getQuestionDetails = async () => {
        //API call
       const response = await fetch(`http://localhost:5000/api/notes/viewnote/${noteId}`,{
         method: "GET",
         headers: {
          "Content-Type": "application/json"
        },
       })
       const specQuestion = await response.json();
      //  console.log(json.note);
       setQuestionData(specQuestion.note)
      }
getQuestionDetails();
  }, [noteId]);

  const getUpdatedReply = async () => {
    //API call
   const response = await fetch(`http://localhost:5000/api/notes/viewnote/${noteId}`,{
     method: "GET",
     headers: {
      "Content-Type": "application/json"
    },
   })
   const specQuestion = await response.json();
  //  console.log(json.note);
   setQuestionData(specQuestion.note)
  }


  const handleSubmit = async (e) => {
    //API Call
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/notes/reply/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({reply}),
    })
    const json = await response.json(); 
    // console.log(json);
    setReply("")
    getUpdatedReply();
    // let replies = JSON.parse(JSON.stringify(json))  
  };




  return( 
  <div className="row my-3">
     
      <div className="my-3 card row-hover pos-relative py-3 px-3 mb-3 ">
              <div className="row align-items-center">
                <div className="col-md-8 mb-3 mb-sm-0">
                  <h1>
                  {questionData?.title}
                  </h1>
                  <p className="text-sm"><span className="op-6">Posted On</span> <span className="text-black" href="#">{questionData?.timestamp}</span> <span className="op-6">by</span> <span className="text-black" href="#">{questionData?.userName}</span></p>

                  <p className="description my-4"> <span className="text-black">{questionData?.description}</span></p>
                </div>
                <div className="col-md-4 op-7">
                </div>
              </div>
            </div>

          {/* <div className='col-md-6'> */}
          <div>
            
      {
        localStorage.getItem("token") ?
        <form 
        onSubmit={handleSubmit}
        >
          <div className="form-group my-2">
            <textarea
              type="text"
              className="form-control"
              name="reply"
              id="reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              aria-describedby="emailHelp"
              placeholder="Reply"
              rows={4}
              cols={50}
              required
            />
          </div>
  
          <button  disabled={reply.length<5} type="submit" className="btn btn-primary my-2">
            Post
          </button>
        </form>
        :
        <div className="container" >
          <h2>You have to be logged in to be able to join this discussion!!</h2>
        </div>
      }
            {
              questionData?.replies && 
              questionData?.replies?.map((item) => {
                return(

<div className="my-3 card row-hover pos-relative py-3 px-3 mb-3">
<div className="row align-items-center">
  <div className="col-md-8 mb-3 mb-sm-0">
  <h5><span>{item.name} replied: </span></h5>
    <p className=" description"><span className="text-black" href="#">{item.reply}</span></p>
    <p className="text-sm"><span className="op-6">Replied On</span> <span className="text-black" href="#">{item.timestamp}</span> <span className="op-6"></span></p>
  </div>
  <div className="col-md-4 op-7">
  </div>
</div>
</div>
                  
                  
                
                )
                
              })
            }
          </div>

      </div>
    
    
    // </div>

  )

}

export default ViewNote;


