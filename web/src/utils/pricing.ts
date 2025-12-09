export const parsePriceNumber = (value?: string | null) => {
  if (!value) return null;
  const cleaned = String(value).replace(/[^\d.,-]/g, '').replace(/\s+/g, '').replace(',', '.');
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
};

export const computeAmountDue = ({
  rentalDays,
  perDay,
  pickupCost = 0,
  returnCost = 0,
}: {
  rentalDays: number | null;
  perDay: number | null;
  pickupCost?: number;
  returnCost?: number;
}) => {
  if (!rentalDays || !perDay) return null;
  return rentalDays * perDay + pickupCost + returnCost;
};
