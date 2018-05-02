export const saveToLocalStorage = place => {
  // get places array in localstorage, provide empty array if places array doesnt exist
  const places = JSON.parse(localStorage.getItem('places') || '[]');

  // Push new place to arrray
  places.push(place);

  // Save array
  localStorage.setItem('places', JSON.stringify(places));
};

export const getPlacesFromLocalStorage = () => {
  const places = JSON.parse(localStorage.getItem('places') || '[]');

  return places;
};

export const markPlaceAsVisited = visitedPlace => {
  const places = JSON.parse(localStorage.getItem('places') || '[]');

  const { id } = visitedPlace;

  places.find(place => place.id === id);
};

export const deletePlace = id => {
  // get array from localstorage
  const places = JSON.parse(localStorage.getItem('places') || '[]');

  // Get index matching place to delete by id
  const index = places.findIndex(place => place.id === id);

  // Remove it from array
  places.splice(index, 1);

  // Set array to storage again
  localStorage.setItem('places', JSON.stringify(places));
};
