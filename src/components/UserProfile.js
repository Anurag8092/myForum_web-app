import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


useEffect(() => {
  if(localStorage.getItem("token")){
    getUser();
  }
    else{ 
      alert("You are not logged in")
      navigate("/login")
      }
}, [navigate])

const getUser = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setName(json.name);
    setEmail(json.email)
  } catch (error) {
    console.log(error);
  }
}

const handleUpdate = (e) => {
  e.preventDefault();
  updateUser(name, email)
}

const handleDelete = (e) => {
  e.preventDefault();
  deleteUser();
  localStorage.removeItem("token");
}

  //Update User
  const updateUser = async (name, email) => {
    //API call
    try{
      const response = await fetch("http://localhost:5000/api/auth/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({name, email}),
      });
      const json = await response.json();
      // console.log(name);
      setName(name);
      setEmail(email);
      if(json.Success === "Updated")
      props.showAlert("Account Updated", "success");
      else
      props.showAlert(json.error, "danger");
    }
    catch(error){
      console.log(error);
    }

  };

    //Delete User
    const deleteUser = async () => {

      //API call
      try{
        const response = await fetch("http://localhost:5000/api/auth/deleteuser", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
          }
        });
        const json = await response.json();
        if(json.Success === "Deleted")
        props.showAlert("Account Deleted", "success");
        else
        props.showAlert(json.error, "danger");
        // console.log(json);
        navigate("/")
      }
      catch(error){
        console.log(error);
      }
  
    };






  return <div>
       <form>
  <div className="my-3 form-group">
    <label htmlFor="title">Name</label>
    <input type="text" className="form-control" id="name" name="name" 
    value={name}   
    onChange={e => setName(e.target.value)}
     />
  </div>
  <div className="my-3 form-group">
    <label htmlFor="description">Email</label>
    <input type="text" className="form-control" id="email" name='email' 
    value={email} 
    onChange={e => setEmail(e.target.value)}
    />

  </div>
  <button type="submit" className="btn btn-primary" 
  onClick={handleUpdate}
  >Update Profile</button>
  <button type="submit" className="mx-3 btn btn-primary" 
  onClick={handleDelete}
  >Delete Profile</button>

</form>
  </div>;
};

export default UserProfile;
