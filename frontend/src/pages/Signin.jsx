import { useState } from "react"
import {Link, Navigate} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();

  //Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        Navigate("/dashboard");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan server");
    }
  };

  return (
    <div className="max-h-screen overflow-hidden flex flex-col relative bg-no-repeat bg-cover bg-center" style={{backgroundImage: "url('/assets/img/background.png')"}}>
      <div className="absolute w-48 h-48 rounded-full bg-teal-500 -top-25 -left-25"></div>
      <div className="absolute w-48 h-48 rounded-full bg-orange-500 -bottom-25 -right-25"></div>
      <div className="text-center pt-12">
          <h1 className="text-6xl font-bold text-teal-700 mb-6">Selamat Datang Kembali</h1>
          <p className="text-gray-600 text-xl leading-relaxed px-4">
            Masuk untuk mengakses <b>Jangkau Medis</b> dan dashboard kesehatan Anda dengan aman.
          </p>
      </div>
      <div className="flex w-full h-screen px-20 overflow-x-hidden">
        <div className="w-1/2" style={{backgroundImage: "url('/assets/img/doc.png')"}}>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full px-40 relative">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-800 mb-3 block">
                  E-mail Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Masukan email anda"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="text-base font-medium text-gray-800 mb-3 block">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Masukan password anda"
                  required
                />
              </div>
              {message && <p className="mt-3 text-center text-sm">{message}</p>}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl text-base transition-colors duration-200 mt-8"
              >
                Sign In
              </button>
            </form>

            <div className="text-center mt-8">
              <p className="text-gray-600 text-base">
                Belum punya akun?
                <Link to="/sign-up" className="ml-2 text-teal-600 hover:text-teal-700 font-medium underline">
                  Daftar
                </Link>
              </p>
            </div>

            <div className="text-center mt-6">
              <button type="button" className="text-base text-gray-600 hover:text-gray-800 underline">
                Lupa kata sandi?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
