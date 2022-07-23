import React from 'react';
import { useAsync } from './hooks';
import { LoadingCircle } from './lib';

const SignIn = ({ onSubmit }) => {
  const { isLoading, isError, error, run } = useAsync();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    run(onSubmit({ username: username.value, password: password.value }));
  };
  return (
    <div className="container">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="title">Sign in to your account</h2>
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
                className="input rounded-t-md"
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
                className="input rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            {isError && <p className="text-error">{error.message}</p>}
            <button
              type="submit"
              className="relative flex justify-center w-full btn"
            >
              {isLoading && <LoadingCircle />}
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
