const saveCartItems = async (cartItem) => {
  // seu código aqui
  localStorage.setItem('cartItems', cartItem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
