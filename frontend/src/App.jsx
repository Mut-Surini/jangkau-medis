// import { useState } from "react";
// import axios from "axios";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/login",
//         { email, password },
//         { withCredentials: true } // penting agar session cookie dikirim
//       );
//       setError("");
//       window.location.href = "/dashboard";
//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setError(err.response.data.error);
//       } else {
//         setError("Terjadi kesalahan server");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;
