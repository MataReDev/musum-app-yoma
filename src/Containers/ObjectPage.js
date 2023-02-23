import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import noImage from "../img/no-image.png";
import planet_svg from "../img/planet.svg"

const ObjectPage = () => {
  const { idObject } = useParams();
  const [dataObject, setDataObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${idObject}`
        );
        const data = await response.json();
        setDataObject(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idObject]);

  return (
    <>
      {dataObject ? (
        <div className="p-8 flex flex-wrap justify-around min-h-full">
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{dataObject.title}</h1>
            <img
              src={dataObject.primaryImage ? dataObject.primaryImage : noImage}
              alt="Primary"
              className="w-full"
            />
          </div>
          <div>
            <div className="mt-4">
              <p className="text-lg font-bold">Description</p>
              <p className="mt-2">{dataObject.objectName}</p>
              <p className="mt-2">{dataObject.medium}</p>
              <p className="mt-2">{dataObject.objectDate}</p>
              <p className="mt-2">{dataObject.creditLine}</p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold">Dimensions</p>
              <ul className="mt-2 list-disc list-inside">
                {dataObject.measurements?.map((measurement) => (
                  <li key={measurement.elementName}>
                    {measurement.elementName}:{" "}
                    {measurement.elementMeasurements.Height} x{" "}
                    {measurement.elementMeasurements.Width} x{" "}
                    {measurement.elementMeasurements.Length}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold">Location</p>
              <p className="mt-2">
                {dataObject.region}, {dataObject.subregion}, {dataObject.locale}
              </p>
            </div>
            <a href={dataObject.objectURL} target="_blank" rel="noreferrer" className="">
              <button className="text-white bg-black hover:bg-white hover:text-black font-bold py-2 px-4 rounded border-2 border-black transition-colors duration-300">
                <img src={planet_svg} alt="" className="fill-white hover:fill-black"/>
                Voir +
              </button>
            </a>
          </div>
        </div>
      ) : (
        <p>Pas de données</p>
      )}
    </>
  );
};

export default ObjectPage;
