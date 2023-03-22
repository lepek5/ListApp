import { render, screen } from "@testing-library/react";
import NewListPage from "./NewListPage";
describe("New List Page", () => {
  const loadingTextContent = "Creating a new list....";
  render(<NewListPage />);
  const loadingElement = screen.getByRole("figure", {hidden: true});
  describe("has loading element", () => {
    it("visible", () => {
      expect(loadingElement).toBeInTheDocument();;
    })
    it("hidden", async () => {
      screen.debug();
      expect(loadingElement).not.toBeInTheDocument();
    })
  })
})