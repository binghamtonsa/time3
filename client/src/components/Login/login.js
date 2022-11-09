import "./App.css";
import { React, useState } from "react";
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("localhost:8080/v1/api/login", {
        method: "POST",
        body: JSON.stringify({
          usrnme: email,
          pswrd: pass,
        }),
      });
      if (res.status === 200) {
        setEmail("");
        setPass("");
        setMessage("Sign in successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          
        />
        <input
          type="text"
          value={pass}
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <input type="hidden" name="csrf" value="fna-$jfn3-7DW3#!4yh-3jnas-dugwf-hu!@-!Iduad-9adnq"></input>
        <button type="submit">Sign In</button>
        

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default Login;