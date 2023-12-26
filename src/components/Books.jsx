import React, { useEffect } from "react";
import { addBooks } from "../Redux/action";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";

function Books(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(addBooks([]));

    props.value
      ? axios
          .post(
            "https://reactnd-books-api.udacity.com/search",
            { query: props.value, maxResults: 20 },
            { headers: { Authorization: "whatever-you-want" } }
          )
          .then((res) => {
            dispatch(addBooks(res.data.books));
          })
          .catch((err) => console.log("ERROR FOUND", err))
      : axios
          .get("https://reactnd-books-api.udacity.com/books", {
            headers: { Authorization: "whatever-you-want" },
          })
          .then((res) => {
            dispatch(addBooks(res.data.books));
          })
          .catch((err) => console.log("ERROR FOUND", err));
  }, [props.value]);

  return (
    <div className="flex flex-wrap items-center justify-center min-h-96 pt-14">
      {Array.isArray(data) && data.length < 1 ? (
        <div className="loader"></div>
      ) : Array.isArray(data) ? (
        data.map((book, index) => {
          return (
            <div
              key={index}
              className="books border border-gray-300 lg:h-80 lg:w-44 m-4 rounded shadow-lg transform hover:scale-110 xs:w-4/6 xs:h-78"
            >
              {book.imageLinks && book.imageLinks.thumbnail ? (
                <img
                  src={book.imageLinks?.thumbnail}
                  alt="Image not available"
                  className="w-full h-5/6"
                />
              ) : (
                <img
                  src={
                    "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-thumbnail-graphic-illustration-vector-png-image_40966590.jpg"
                  }
                />
              )}
              <p className="font-bold px-1 text-sm">{book.title}</p>
              <div className="space-x-2 px-1">
                <span>
                  {book.averageRating
                    ? book.averageRating
                    : Math.floor(Math.random() * 5) + 1}
                </span>
                <span>⭐</span>
                <span className="text-green-500 font-bold">Free</span>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className=" text-red-500 font-bold text-xl">OOPS, NOT AVAILABLE</h1>
      )}
    </div>
  );
}

export default Books;
