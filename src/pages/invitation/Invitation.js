import React, { useState } from "react";
import { useParams } from "react-router";
import { useAsync } from "./../../hooks";
import { LoadingCircle } from "./../../lib";
import { Toggle } from './../../components/toggle'
const Invitation = ({ onSubmit }) => {
  const { code } = useParams();
  const { isLoading, isError, error, run } = useAsync();
  const [autoJoin, setAutoJoin] = useState(true)
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    console.log(autoJoin)
    run(
      onSubmit({
        username: username.value,
        password: password.value,
        code: code,
        autoJoin,
      })
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 pb-32 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign up
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label className="sr-only">Email address</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label className="sr-only">Invitation Code</label>
              <input
                id="code"
                name="code"
                type="text"
                disabled
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Code"
                value={`Code: ${code}`}
              />
            </div>
          </div>
          <div className='flex items-center'>
          <Toggle id="autoJoin" on={autoJoin} onChange={(e)=> {setAutoJoin(!autoJoin)}}/>
          <span className='ml-2 text-gray-700'>Join Invitor's Group</span>
          </div>
          <div>
            {isError && (
              <p className="mb-4 text-center text-red-600">{error.message}</p>
            )}
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading && <LoadingCircle />}
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Invitation;
