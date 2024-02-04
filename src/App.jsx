import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Books from "./components/Books";
import Register from "./components/Register";
import { useSelector } from "react-redux";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [sendValue, setSendValue] = useState("");

  const user = useSelector((state) => state.user);

  return (
    <div>
      {/* navbar */}

      <div className="flex justify-between items-center border-gray-600 border-2 lg:p-6 xs:p-2 shadow-lg">
        <div className="flex space-x-2 items-center">
          <img
            className="xs:h-8 md:h-16"
            src="https://kalvium.com/wp-content/uploads/2022/07/fav.png"
            alt=""
          />
          <div>
            <h1 className="text-red-600 font-bold lg:text-xl">Kalvium</h1>
            <h1 className="font-bold xs:text-xs">Books</h1>
          </div>
        </div>

        <div>
          <input
            type="search"
            placeholder="search books..."
            value={searchValue}
            onKeyUp={(e) => {
              e.key == "Enter" && setSendValue(searchValue);
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border border-gray-400 lg:w-80 xs:w-24 h-9 p-3 shadow-lg rounded-s-sm "
          />
          <span
            onClick={() => setSendValue(searchValue)}
            className="border border-gray-400 p-2 rounded-sm hover:bg-gray-300	"
          >
            <i className="fa fa-search"></i>
          </span>
        </div>

        {user ? (
          <h1 className="xs:text-xs">
            Hello <span className="text-red-500 font-bold xs:text-xs">{user}</span>
          </h1>
        ) : (
          <div>
            <Link to="/register">
              <button className="text-white font-bold bg-blue-600 xs:p-1 rounded lg:px-4 lg:py-2 hover:bg-blue-700">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* main-page */}

      <div className=" border-gray-600 border-2 min-h-96 mt-2">
        <Routes>
          <Route path="/" element={<Books value={sendValue} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* credits */}

      <div className="m-3 text-center">
        <p>
          Developed and Designed by 
          <span className="text-red-600 font-bold underline ">
            <a href="https://santhosh-portfolio-ccbab.web.app/"> Santhosh</a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
