export const formatCurrency = (amount: number) => {
  const k = Math.round(amount / 1000);
  return k.toLocaleString('vi-VN') + 'k';
};

export const formatK = (amount: number) => {
  const k = Math.round(amount / 1000);
  return k.toLocaleString('vi-VN') + 'k';
};
