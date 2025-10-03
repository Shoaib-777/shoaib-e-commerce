export function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0123456789";
  let orderId = "";
  for (let i = 0; i < 8; i++) {  
    const randIndex = Math.floor(Math.random() * chars.length);
    orderId += chars[randIndex];
  }
  return orderId;
}