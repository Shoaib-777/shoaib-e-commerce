export function formatCustomDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date)) return '';

  // Extract date parts
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();

  // Format time (12-hour clock with AM/PM)
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 to 12 for 12-hour format

  // Final string: "DD MM YYYY HH:MM AM/PM"
  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}
