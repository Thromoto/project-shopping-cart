const fetchItem = async (item) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${item}`;
  try {
    const request = await fetch(url);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
