import { render, screen } from "@testing-library/react";

import Logo from "@/components/Logo";

describe("logo", () => {
  it("renders the logo", () => {
    render(<Logo />);

    const link = screen.getByRole("link", { name: "Transactly" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/wallet");
  });
});
