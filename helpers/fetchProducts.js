const fetchProducts = async (comput) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${comput}`;
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
    fetchProducts,
  };
}
