import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import noImage from "../img/no-image.png";
import planet_svg from "../img/planet.svg";
import Carousel from "../Components/Carousel";

const ObjectPage = () => {
  const { idObject } = useParams();
  const [dataObject, setDataObject] = useState(null);
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    let temp = null;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${idObject}`
        );
        const data = await response.json();
        temp = data;
        setDataObject(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDepartment = async () => {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/departments`
      );
      console.log(temp);
      const data = await response.json();
      if (data && data.departments) {
        const dep = data.departments.filter(
          (dep) => dep.displayName === temp.department
        );
        console.log(dep);
        setDepartment(dep);
      }
    };

    fetchData();

    fetchDepartment();
  }, [idObject, navigate]);

  if (!dataObject || dataObject.message) {
    navigate("/not-found");
    return null;
  }

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col justify-around">
      <div className="button-container">
        <button className="back-button" onClick={goBack}>
          <FiArrowLeft />
        </button>
      </div>
      <div className="flex flex-wrap justify-around ">
        <div className="flex flex-col justify-center gap-3">
          <h1 className="text-2xl font-bold">{dataObject.title}</h1>
          <img
            src={dataObject.primaryImage ? dataObject.primaryImage : noImage}
            alt="Primary"
            className="max-w-lg"
          />
        </div>
        <div>
          <div className="mt-4">
            <p className="text-lg font-bold">Description</p>
            <p className="mt-2">Tite : {dataObject.title}</p>
            <p className="mt-2">
              Artiste :{" "}
              <a
                href={dataObject.artistWikidata_URL}
                className="mt-2 underline"
                target="_blank"
                rel="noreferrer"
              >
                {dataObject.artistDisplayName}
              </a>
            </p>
            <p className="mt-2">Date de création : {dataObject.objectDate}</p>
            <p className="mt-2">Dimensions : {dataObject.dimensions}</p>
          </div>
          <div className="flex gap-5">
            <a href={dataObject.objectURL} target="_blank" rel="noreferrer">
              <button className="text-white bg-black hover:bg-white hover:text-black font-bold py-2 px-4 rounded border-2 border-black transition-colors duration-300">
                Voir MetMuseum
              </button>
            </a>
            <a
              href={dataObject.objectWikidata_URL}
              target="_blank"
              rel="noreferrer"
            >
              <button className="text-white bg-black hover:bg-white hover:text-black font-bold py-2 px-4 rounded border-2 border-black transition-colors duration-300">
                Voir Wikidata
              </button>
            </a>
          </div>
        </div>
      </div>

      <div>
        Oeuvres d'art associées
        {department.map((dep) => {
          return (
            <Carousel
              key={dep.departmentId}
              prefix={`carousel-${dep.departmentId}`}
              apiGet={`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${dep.departmentId}&q=""&hasImage=true`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ObjectPage;
