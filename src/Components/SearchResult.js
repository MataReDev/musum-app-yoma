import React, { Component } from "react";

const SearchResult = (props) => {
    
  const searchObject = async () => {
    try {
        props.objectIDs.forEach(async (object) => {
        const elem = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${object}`
        );
        const dataelem = await elem.json();
        console.log(dataelem);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <div>{}</div>;
};

export default SearchResult;
