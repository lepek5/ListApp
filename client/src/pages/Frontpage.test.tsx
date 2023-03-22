import { render, screen } from "@testing-library/react"
const paragraph = screen.getByRole("paragraph");
import App from "../App"

describe("Frontpage", () => {

  render(<App />);

  const headingString = "Your List";
  const introString = "Create an interactive list for you or for your friends to keep up with things to do!";
  const linkString = "Create a New List!";
  const paragraph = screen.getByText(introString);
  const button = screen.getByRole("button");
  const heading = screen.getByRole("heading");
  
  describe("has elements rendered", () => {
    it("header", () => {
      expect(heading).toBeInTheDocument();
    })
    it("intro paragraph", () => {
      expect(paragraph).toBeInTheDocument();
    })
    it("link", () => {
      expect(button).toBeInTheDocument();
    })
  })
  describe("has correct content on element", () => {
    it("header", () => {
      expect(heading).toHaveTextContent(headingString);
    })
    it("intro paragraph", () => {
      expect(paragraph).toHaveTextContent(introString);
      
    })
    describe("link", () => {
      expect(screen.getByRole("button")).toBeInTheDocument();
      it("has correct text content", () => {
        expect(button).toHaveTextContent(linkString);      
      })
      it("has correct href attribute", () => {
        expect(button).toHaveAttribute("href", "/new");
      })
    })
  });
})