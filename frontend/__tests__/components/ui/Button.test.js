import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../../../src/components/ui/Button";

describe("Button component", () => {
  it("renders the button with text", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    const { container } = render(<Button>Primary Button</Button>);
    expect(container.firstChild).toHaveClass("bg-primary-600");
  });

  it("applies secondary variant when specified", () => {
    const { container } = render(
      <Button variant="secondary">Secondary Button</Button>
    );
    expect(container.firstChild).toHaveClass("bg-gray-200");
  });

  it("shows loading state when isLoading is true", () => {
    render(<Button isLoading={true}>Loading Button</Button>);
    expect(screen.getByText("Loading Button")).toBeInTheDocument();
    expect(document.querySelector("svg.animate-spin")).toBeInTheDocument();
  });
});
