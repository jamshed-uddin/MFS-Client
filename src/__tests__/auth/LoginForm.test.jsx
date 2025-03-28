import LoginForm from "@/components/LoginForm";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Login form", () => {
  const mockSubmit = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form input", () => {
    render(<LoginForm submitFunc={mockSubmit} submitInProgress={false} />);

    expect(
      screen.getByLabelText(/email or mobile number/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/pin/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("calls submit function when form submitted", () => {
    render(<LoginForm submitFunc={mockSubmit} submitInProgress={false} />);
    const emailOrMobileNumber = screen.getByLabelText(
      /email or mobile number/i
    );
    const pin = screen.getByLabelText(/pin/i);

    const form = screen.getByTestId("loginForm");

    fireEvent.change(emailOrMobileNumber, {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(pin, { target: { value: "12345" } });
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when submit in progress", () => {
    render(<LoginForm submitFunc={mockSubmit} submitInProgress={true} />);
    const button = screen.getByRole("button", { name: "Login" });

    expect(button).toBeDisabled();
  });
});
