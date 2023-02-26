import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ObjectComonent from "./ObjectComonent";

function useSearchValue(departmentId) {
  const location = useLocation();
  const searchValue = departmentId
    ? `1`
    : new URLSearchParams(location.search).get("search");
  return searchValue;
}

function SearchResult(props) {
  const [data, setData] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20);
  const [showHighlightedOnly, setShowHighlightedOnly] = useState(false);
  const searchValue = useSearchValue(props.departmentId);

  useEffect(() => {
    async function searchItem() {
      try {
        const endpoint = showHighlightedOnly
          ? props.advancedSearch
            ? `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&departmentId=${props.departmentId}&isHighlight=true&q=""`
            : `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&isHighlight=true&q=${searchValue}`
          : props.advancedSearch
          ? `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&departmentId=${props.departmentId}&q=""`
          : `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=${searchValue}`;
        const response = await fetch(endpoint);
        const temp = await response.json();
        setData(temp.objectIDs);
        setStartIndex(0);
        setEndIndex(20);
      } catch (error) {
        console.error(error);
      }
    }

    if (searchValue) {
      searchItem();
    }
  }, [searchValue, showHighlightedOnly, props]);

  function handleSeeLess() {
    setStartIndex(0);
    setEndIndex((prevEndIndex) => {
      const newEndIndex = prevEndIndex - 20;
      return newEndIndex < 20 ? 20 : newEndIndex;
    });
  }

  function handleSeeMore() {
    setEndIndex((prevEndIndex) => {
      const newEndIndex = prevEndIndex + 20;
      return newEndIndex > data.length ? data.length : newEndIndex;
    });
  }

  function toggleHighlightedOnly() {
    setShowHighlightedOnly(
      (prevShowHighlightedOnly) => !prevShowHighlightedOnly
    );
  }

  const items = data?.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-3 p-10 content-center justify-center">
      {data !== null ? (
        <div className="flex gap-5 justify-center">
          <button
            className="bg-white hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded-lg border-2  transition-colors duration-300"
            onClick={toggleHighlightedOnly}
          >
            {showHighlightedOnly ? "Show All" : "Show Highlighted Only"}
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}

      <div
        className="flex flex-wrap justify-center items-stretch gap-4"
        style={{ alignItems: "stretch" }}
      >
        {items?.map((element, index) => (
          <ObjectComonent key={index} object={element} />
        ))}
      </div>
      <div className="flex gap-5 justify-center">
        {data?.length > 0 && endIndex > 20 && (
          <button
            className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
            onClick={handleSeeLess}
          >
            - Voir moins
          </button>
        )}
        {data?.length > 20 && (
          <button
            className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
            onClick={handleSeeMore}
          >
            + Voir plus
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
