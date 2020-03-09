export const addItemToCart = (currentCart, item) => {
  if (
    currentCart.find(
      cartItem => cartItem._id === item._id && cartItem.size === item.size
    )
  ) {
    return currentCart.map(cartItem =>
      cartItem._id === item._id && cartItem.size === item.size
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...currentCart, { ...item, quantity: 1 }];
};

export const removeItemFromCart = (currentCart, item) => {
  if (
    currentCart.find(
      cartItem =>
        cartItem._id === item._id &&
        cartItem.size === item.size &&
        cartItem.quantity >= 2
    )
  ) {
    return currentCart.map(cartItem =>
      cartItem._id === item._id &&
      cartItem.size === item.size &&
      cartItem.quantity >= 2
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  return currentCart.filter(
    cartItem => !(cartItem._id === item._id && cartItem.size === item.size)
  );
};

export const increaseCartItemQuantity = (currentCart, item) => {
  return currentCart.map(cartItem =>
    cartItem._id === item._id && cartItem.size === item.size
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

export const mapDeliveryPriceToSpeed = deliveryPrice => {
  switch (deliveryPrice) {
    case 3.49:
      return "Standard";
    case 7.99:
      return "Two Day";
    case 11.99:
      return "Next Day";
  }
};
