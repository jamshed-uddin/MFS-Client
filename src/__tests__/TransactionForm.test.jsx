import TransactionForm from "@/components/TransactionForm";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Transaction form", () => {
  const transactionMockSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the transaction form", () => {
    render(
      <TransactionForm
        submitInProgress={false}
        submitTransaction={transactionMockSubmit}
      />
    );

    const receiverNumber = screen.getByLabelText(/receiver number/i);
    const amount = screen.getByLabelText(/amount/i);
    const note = screen.getByLabelText(/note/i);
    const pin = screen.getByLabelText(/pin/i);
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(receiverNumber).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
    expect(note).toBeInTheDocument();
    expect(pin).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("calls submit function when form submitted", () => {
    render(
      <TransactionForm
        submitInProgress={false}
        submitTransaction={transactionMockSubmit}
      />
    );
    const form = screen.getByTestId("transactionForm");
    const receiverNumber = screen.getByLabelText(/receiver number/i);
    const amount = screen.getByLabelText(/amount/i);
    const note = screen.getByLabelText(/note/i);
    const pin = screen.getByLabelText(/pin/i);

    fireEvent.input(receiverNumber, { target: { value: "018123232322" } });
    fireEvent.input(amount, { target: { value: "322" } });
    fireEvent.input(note, { target: { value: "hello" } });
    fireEvent.input(pin, { target: { value: "3232" } });
    fireEvent.submit(form);

    expect(transactionMockSubmit).toHaveBeenCalledTimes(1);
  });
});
