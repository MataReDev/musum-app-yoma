import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchResult from "../Components/SearchResult";

describe("SearchResult", () => {
  test("displays search results", () => {
    render(
      <Router>
        <SearchResult />
      </Router>
    );

    // test code
  });

  test("handles See Less button click", () => {
    function TestComponent() {
      // Mock state variables and functions
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const [startIndex, setStartIndex] = useState(0);
      const [endIndex, setEndIndex] = useState(20);
      const handleSeeLess = () => {
        setStartIndex(0);
        setEndIndex(20);
      };

      return (
        <SearchResult
          data={data}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          endIndex={endIndex}
          setEndIndex={setEndIndex}
          handleSeeLess={handleSeeLess}
        />
      );
    }

    render(
      <Router>
        <TestComponent />
      </Router>
    );

    // test code
  });
});
