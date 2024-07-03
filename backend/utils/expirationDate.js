export function calculateExpirationDate(issueTimestamp, yearsValid = 3) {
  const issueDate = new Date(issueTimestamp);
  const expirationDate = new Date(
    issueDate.setFullYear(issueDate.getFullYear() + yearsValid)
  );

  const month = (expirationDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const year = expirationDate.getFullYear().toString().slice(-2); // Get last two digits of the year

  return `${month}/${year}`;
}
