import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import noImage from "../img/no-image.png";

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
    <div className="p-8">
      {dataObject ? (
        <div>
          <h1 className="text-2xl font-bold">{dataObject.title}</h1>
          <div className="mt-4">
            <img
              src={dataObject.primaryImage ? dataObject.primaryImage : noImage}
              alt="Primary"
              className="w-full"
            />
          </div>
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
              {dataObject.region}, {dataObject.subregion},{" "}
              {dataObject.locale}
            </p>
          </div>
        </div>
      ) : (
        <p>Pas de données</p>
      )}
    </div>
  );
};

export default ObjectPage;
