import React, { Component } from "react";
import QuickSearch from "../Containers/QuickSearch";

class AdvancedSearch extends Component {
  render() {
    return (
      <div className="flex justify-center gap-5 flex-col">
        <QuickSearch />
      </div>
    );
  }
}

export default AdvancedSearch;
