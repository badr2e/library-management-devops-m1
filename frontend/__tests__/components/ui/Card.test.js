import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../../../src/components/ui/Card";

describe("Card component", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders with title when provided", () => {
    render(
      <Card title="Card Title">
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies additional className when provided", () => {
    const { container } = render(
      <Card className="test-class">
        <p>Card content</p>
      </Card>
    );
    expect(container.firstChild).toHaveClass("test-class");
  });
});
