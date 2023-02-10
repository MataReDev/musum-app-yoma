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
        setDataObject(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.object]);

  return (
    <div className="flex justify-center w-60 border">
      {dataObject ? (
        <div className="">
          <p>Nom de l'objet : {dataObject.title}</p>
          <p>Département : {dataObject.department}</p>

          <img
            className="object-fill md:w-32 lg:w-48"
            src={dataObject.primaryImage ? dataObject.primaryImage : noImage}
            alt="img"
          />
        </div>
      ) : (
        <>Chargement</>
      )}
    </div>
  );
};

export default Object;
