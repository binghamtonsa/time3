import "./App.css";
import { React, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async () => {
    // API call
  }

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
        <button type="submit">Sign In</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default Login;