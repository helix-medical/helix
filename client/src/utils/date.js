function dateToReadable(dateTimeString) {
  const date = new Date(dateTimeString);
  const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const optionsDateTime = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = new Intl.DateTimeFormat('fr-FR', optionsDate).format(date);
  const formattedDateTime = new Intl.DateTimeFormat('fr-FR', optionsDateTime).format(date);
  
  if (formattedDateTime.slice(-5) === '00:00') {
    return formattedDate;
  } else {
    return formattedDateTime;
  }
}



// console.log(dateToReadable('2020-12-31T23:00:00.000Z'));
// console.log(dateToReadable('2023-03-08T23:10:00.000Z'));


export default dateToReadable;