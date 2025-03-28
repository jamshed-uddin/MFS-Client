import PinInput from "@/components/PinInput";
import { screen, render, fireEvent } from "@testing-library/react";

describe("Pin input", () => {
  it("renders pin input with correct attributes", () => {
    render(<PinInput />);
    const input = screen.getByTestId("pinInput");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("maxLength", "5");
    expect(input).toHaveAttribute("inputMode", "numeric");
    expect(input).toHaveAttribute("required");
  });

  it("accepts only numeric value", () => {
    render(<PinInput />);
    const input = screen.getByTestId("pinInput");

    fireEvent.input(input, { target: { value: "123a" } });
    expect(input.value).toBe("123");
  });

  it("accepts only 5 digit pin", () => {
    render(<PinInput />);
    const input = screen.getByTestId("pinInput");

    fireEvent.input(input, { target: { value: "12345678" } });
    expect(input.value).toBe("12345");
  });
});
