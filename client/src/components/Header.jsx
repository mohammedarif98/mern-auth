import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'


const Header = () => {
  const {currentUser} = useSelector((state) => state.user)

  return (
    <div className=" bg-emerald-800">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-5">
        <Link to="/">
          <h1 className="font-bold text-xl">Auth App</h1>
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link to="/">
                Home
            </Link>
          </li>
          <li>
            <Link to="/about">
                About
            </Link>
          </li>
          <li>
            <Link to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />   
              ) : (
                "Login"
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};



export default Header;
