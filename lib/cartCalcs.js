function totalCartItems(cart) {
  return cart.reduce((sum, { item, quantity }) => item ? sum + quantity : sum, 0);
}

function totalCartPrice(cart) {
  return cart.reduce((sum, { item, quantity }) => item ? sum + item.price * quantity : sum, 0);
}

export { totalCartItems, totalCartPrice };
