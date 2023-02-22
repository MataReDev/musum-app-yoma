import React from "react";
import { Link } from "react-router-dom";
import QuickSearch from "../Components/QuickSearch";

const HeaderBar = () => {
  return (
    <header className="p-4 flex gap-10 items-center justify-between border-b-2 bg-gray-200">
      <div className="flex flex-row">
        <Link
          to="/"
          className="flex flex-row px-4 py-2 border-2 rounded-lg hover:border-black transition-all duration-300"
        >
          <svg
            className="w-6 h-6 mr-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z" />
          </svg>
          <h1 className="font-bold">SupKnowledge</h1>
        </Link>
        <Link
          to="/advanced-search"
          className="flex flex-row ml-2 text-black font-bold"
        >
          <button className="px-4 py-2 border-2 rounded-lg hover:border-black transition-all duration-300">
            Recherche avancée
          </button>
        </Link>
      </div>
      <QuickSearch />
    </header>
  );
};

export default HeaderBar;
