import React, { useState, useEffect } from "react";

import "../Style/App.css";
import noImage from "../img/no-image.png";

const Object = (props) => {
  const [dataObject, setDataObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const elem = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.object}`
        );
        const data = await elem.json();
        console.log(data);
        setDataObject(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.object]);

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 max-w-xs p-2">
      {dataObject ? (
        <div className="rounded-lg border border-gray-300 shadow-lg p-6">
          <div className="text-center">
            <p className="font-bold text-lg">{dataObject.title}</p>
            <p className="italic font-thin">{dataObject.department}</p>
          </div>
          <div className="flex justify-center my-6">
            <img
              className="object-fill md:w-32 lg:w-48"
              src={dataObject.primaryImage ? dataObject.primaryImage : noImage}
              alt="img"
            />
          </div>
          <div className="flex justify-end">
            {dataObject.constituents && dataObject.constituents.length > 0 && (
              <a
                href={dataObject.constituents[0]?.constituentWikidata_URL}
                target="_blank" rel="noreferrer"
              >
                <button className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded border-2 border-black transition-colors duration-300">
                  Voir l'artiste
                </button>
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Object;
