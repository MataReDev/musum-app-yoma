import React from "react";
import { render, screen } from "@testing-library/react";
import ObjectComponent from "../Components/ObjectComponent";

test("renders object title and department", async () => {
  const fakeData = {
    title: "Test Object",
    department: "Test Department",
    primaryImage: null,
    objectURL: "http://example.com",
    objectID: 12345,
    isHighlight: false,
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );

  render(<ObjectComponent object="123" />);
  const title = await screen.findByText("Test Object");
  const department = screen.getByText("Test Department");
  expect(title).toBeInTheDocument();
  expect(department).toBeInTheDocument();

  global.fetch.mockRestore();
});
