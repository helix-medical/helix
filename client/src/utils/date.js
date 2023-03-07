// const dateTimeToFrench = (date) => {
//     const dateArray = date.split(' ');
//     const dateToTransform = dateArray[0].split('-');
//     return `${dateToTransform[2]}/${dateToTransform[1]}/${dateToTransform[0]} ${dateArray[1]}`;
// }

// function dateToReadable(date) {
//     const dateObj = new Date(date);
//     const day = dateObj.getDate().toString().padStart(2, '0');
//     const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
//     const year = dateObj.getFullYear().toString();
//     return `${day}/${month}/${year}`;
//   }

function dateToReadable(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const dateObj = new Date(date);
    const localDateObj = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
    const localDateString = localDateObj.toLocaleDateString('fr-FR', options);
    const localTimeString = localDateObj.toLocaleTimeString('fr-FR', options);
    return localTimeString.startsWith('00:') ? localDateString : `${localDateString} ${localTimeString}`;
}


// console.log(dateToReadable('2020-12-31T23:00:00.000Z'));
// console.log(dateToReadable('2023-03-08T23:10:00.000Z'));


export default dateToReadable;