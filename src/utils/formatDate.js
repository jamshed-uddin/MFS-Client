const formatDate = (date) => {
  if (!date) return null;

  const newDate = new Date(date);

  return newDate.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default formatDate;
