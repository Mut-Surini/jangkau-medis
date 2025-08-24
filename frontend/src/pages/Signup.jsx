import { useState } from "react"
import {Link} from 'react-router-dom'

function Signup() {

   const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Sign up form submitted:", formData)
    }

  return (
    <div className="max-h-screen overflow-hidden flex flex-col relative bg-no-repeat bg-cover bg-center" style={{backgroundImage: "url('/assets/img/background.png')"}}>
      <div className="absolute w-48 h-48 rounded-full bg-teal-500 -top-25 -left-25"></div>
      <div className="absolute w-48 h-48 rounded-full bg-orange-500 -bottom-25 -right-25"></div>
      <div className="text-center pt-12">
          <h1 className="text-6xl font-bold text-teal-700 mb-6">Registrasi Akun</h1>
          <p className="text-gray-600 text-xl leading-relaxed px-4">
            Bergabunglah dengan platform medis kami untuk mengakses <b>Jangkau Medis</b> dan mengelola catatan kesehatan Anda dengan mudah.
          </p>
      </div>
      <div className="flex w-full h-screen px-20 overflow-x-hidden">
        <div className="w-1/2" style={{backgroundImage: "url('/assets/img/doc.png')"}}>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full px-40 relative">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-800 mb-3 block">
                        Nama Lengkap
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        placeholder="Masukan nama lengkap anda"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-base font-medium text-gray-800 mb-3 block">
                    E-mail Address
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Masukan password anda"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-base font-medium text-gray-800 mb-3 block">
                    Konfirmasi Password
                    </label>
                    <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Konfirmasi password anda"
                    required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl text-base transition-colors duration-200 mt-8"
                >
                    Sign Up
                </button>
            </form>

            <div className="text-center mt-6">
                <p className="text-gray-600">
                Sudah punya akun?
                <Link to="/sign-in" className="ml-2 text-teal-600 hover:text-teal-700 font-medium underline">
                    Masuk
                </Link>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
