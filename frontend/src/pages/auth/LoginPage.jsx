import React from "react";
import { FaGoogle } from "react-icons/fa";
import banner1 from "../../assets/banner.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pb-44">
      <div className="w-full max-w-4xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <div className="flex justify-center">
              <h2 className="text-3xl font-bold mb-4">Login</h2>
            </div>
            <form>
              <div className="mb-4">
                <label className="flex justify-center text-gray-700 mb-5" htmlFor="email">
                  Enter your email & password to log in
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="email@domain.com"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                Login
              </button>
            </form>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-600">or continue with</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center justify-center mt-4">
              <FaGoogle className="mr-2" /> Google
            </button>
          </div>
          <div>
            <img src={banner1} alt="Advertisement" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
