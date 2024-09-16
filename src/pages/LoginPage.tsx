import { useContext, useState } from "react";
import faceRec from "../assets/loginImg/Face image.jpg";
import { useLoginMutation } from "../service/authpoint";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData);
    try {
      const res = await login(formData).unwrap();
      if (res.ok) {
        localStorage.setItem("X_FR_token", res.token)
        setToken(res.token)
        navigate('/')
      } else {
        toast.error(res?.message)

      }
    } catch (error: any) {
      toast.error(error.data.message)
    }
  }
  return (
    <div className="bg-[#051725]">
      <div className="mx-auto container">
        <div className="flex justify-center items-center px-6 h-screen">
          <div className="flex w-full lg:w-11/12 xl:w-3/4">
            <div
              className="lg:block hidden bg-gray-400 bg-cover rounded-l-lg w-full lg:w-1/2 h-auto"
              style={{
                backgroundImage:
                  `url('${faceRec}')`,
              }}
            />
            <div className="bg-white p-5 rounded-lg lg:rounded-l-none w-full lg:w-1/2">
              <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
              <form onSubmit={handleSubmit} className="bg-white mb-4 px-8 pt-6 pb-8 rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700 text-sm"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                    className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"

                    type="email"
                    placeholder="Username"
                    name='email' value={formData.email} onChange={handleChange}

                  />
                </div>
                <div className="relative mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700 text-sm"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow focus:shadow-outline mb-3 px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"

                    type={showPassword ? "text" : "password"}
                    placeholder="******************"
                    name='password' onChange={handleChange}
                    value={formData.password}
                  />
                  {
                    showPassword ? <FaRegEye onClick={() => setShowPassword(!showPassword)} className="top-9 right-2.5 absolute text-gray-700 cursor-pointer" size={22} /> : <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} className="top-9 right-2.5 absolute text-gray-700 cursor-pointer" size={22} />
                  }
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 focus:shadow-outline px-4 py-2 rounded-full w-full font-bold text-white focus:outline-none"
                    type="submit"
                    disabled={isLoading}
                  >
                    Sign In
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  {/* <a
                    className="inline-block text-blue-500 text-sm hover:text-blue-800 align-baseline"
                    href="./forgot-password.html"
                  >
                    Forgot Password?
                  </a> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
