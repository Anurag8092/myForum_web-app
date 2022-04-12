import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    //API call
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the suth token and redirect
      localStorage.setItem("token", json.authToken);
      history("/");
      props.showAlert("Account Created", "success");
    } else {
      props.showAlert(json.error, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="name"
            className="my-3 form-control"
            name="name"
            id="name"
            value={credentials.name}
            onChange={onChange}
            minLength={5}
            required
            placeholder="Name"
          />
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={credentials.email}
            onChange={onChange}
            minLength={5}
            required
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="my-2 form-control"
            name="password"
            id="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
