function dateToReadable(dateTimeString) {
  if (!dateTimeString) {
    return 'no-date';
  };

  const date = new Date(dateTimeString);
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);

  const formattedDateTime = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);

  return formattedDateTime.slice(-5) === '00:00' ? formattedDate : formattedDateTime;
}

export default dateToReadable;