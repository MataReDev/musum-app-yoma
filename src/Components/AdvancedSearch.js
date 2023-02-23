import React, { Component } from "react";
//mini commit
class AdvancedSearch extends Component {
  render() {
    return (
      <div className="flex flex-col gap-5">
        <h2>Search query:</h2>
        <input type="text" name="query" />

        <h2>Department:</h2>
        <div className="flex gap-5">
          <label for="department-ancient-near-eastern-art">
            <input
              type="checkbox"
              name="department"
              id="department-ancient-near-eastern-art"
              value="ancient-near-eastern-art"
            />
            Ancient Near Eastern Art
          </label>
          <label for="department-egyptian-art">
            <input
              type="checkbox"
              name="department"
              id="department-egyptian-art"
              value="egyptian-art"
            />
            Egyptian Art
          </label>
          <label for="department-greek-and-roman-art">
            <input
              type="checkbox"
              name="department"
              id="department-greek-and-roman-art"
              value="greek-and-roman-art"
            />
            Greek and Roman Art
          </label>
          <label for="department-asian-art">
            <input
              type="checkbox"
              name="department"
              id="department-asian-art"
              value="asian-art"
            />
            Asian Art
          </label>
        </div>

        <h2>Highlighted:</h2>
        <input type="checkbox" name="highlighted" />

        <button type="submit">Search</button>
      </div>
    );
  }
}

export default AdvancedSearch;
