import { useState, useEffect } from "react";
import Carousel from "../Components/Carousel";
import "../Style/App.css";

function App() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/departments`
      );
      const data = await response.json();
      if (data && data.departments) {
        const randomDepartments = data.departments
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setDepartments(randomDepartments);
      }
    };

    fetchDepartment();
  }, []);

  return (
    <div className="App">
      {departments.map((dep, idx) => {
        return (
          <Carousel
            key={dep.departmentId}
            prefix={`carousel-${dep.departmentId}`}
            apiGet={`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${dep.departmentId}&q=""&hasImage=true`}
            title={"Department : " + dep.displayName}
          />
        );
      })}
    </div>
  );
}

export default App;
