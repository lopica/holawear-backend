import React from "react";
import { FaGoogle } from "react-icons/fa";
import banner1 from "../../assets/banner.png";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pb-44">
      <div className="w-full max-w-4xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <div className="flex justify-center">
              <h2 className="text-3xl font-bold mb-4">Create an account</h2>
            </div>
            <form>
              <div className="mb-4">
                <label className="flex justify-center text-gray-700 mb-5" htmlFor="email">
                  Enter your email to sign up for this app
                </label>
                <div className="mb-4">
                  <input type="email" id="email" className="w-full px-3 py-2 border rounded" placeholder="Full Name" />
                </div>
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
              <div className="mb-4">
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Confirm Password"
                />
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                Register
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
            <div className="">
              <p className="text-center text-gray-600 text-xs mt-4">
                By clicking continue, you agree to our{" "}
                <a href="#" className="underline">
                  <b>Terms of Service</b>
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  <b>Privacy Policy</b>
                </a>
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <img src={banner1} alt="Advertisement" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
