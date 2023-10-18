import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./Login.module.scss";
import { AuthContext } from "@/providers/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      login(response.data.token);
      router.push("/users");
    } catch (error) {
      setError("Wrong email or password.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
