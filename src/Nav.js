import React from "react";
import PropTypes from "prop-types";

const Nav = (props) => {
  const { user, onSignOut } = props;
  return (
    <nav className="bg-gray-800">
      <div className="flex items-center justify-between h-16 ml-4">
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4"></div>
          </div>
        </div>
        <div className="flex items-center ml-4 sm:px-3">
          <div className="mr-4 text-sm font-medium leading-none text-white">
            {user.username}
          </div>
          <button
            className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md"
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  user: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default Nav;
