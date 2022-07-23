import React from "react";
import { Link } from "react-router-dom";
const Landing = ({ onSubmit }) => {
  return (
    <div class="bg-gray-50 min-h-screen flex self-center">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span class="block text-indigo-600">Congratulations!</span>
          <span class="block mt-2">Ready to dive in?</span>
        </h2>
        <div class="ml-5 mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <Link
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              to="/"
            >
              Sign In to dashboard
            </Link>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <Link
              href="#"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Ask your inviter for Mini Program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
