// This is a utility function that returns a formatted date string
// "Sunday, January 2, 2023 at 10:00:00 AM"

export const newFormattedDate = new Date(Date.now()).toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});
