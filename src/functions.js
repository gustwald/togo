export const saveToLocalStorage = place => {
  // get places array in localstorage, provide empty array if places array doesnt exist
  const places = JSON.parse(localStorage.getItem('places') || '[]');

  // Push new place to arrray
  places.push(place);

  // Save array
  localStorage.setItem('places', JSON.stringify(places));
};
