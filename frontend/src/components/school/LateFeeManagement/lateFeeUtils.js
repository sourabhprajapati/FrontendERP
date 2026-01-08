export const calculateLateFee = ({
  dueDate,
  paidDate,
  mode,          // "ONETIME" | "PERDAY"
  amount,        // one-time amount OR per-day amount
}) => {
  if (!amount || !dueDate) return 0;

  const due = new Date(dueDate);
  const paid = paidDate ? new Date(paidDate) : new Date();

  if (paid <= due) return 0;

  if (mode === "ONETIME") {
    return Number(amount);
  }

  if (mode === "PERDAY") {
    const diffTime = paid.getTime() - due.getTime();
    const lateDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return lateDays * Number(amount);
  }

  return 0;
};
