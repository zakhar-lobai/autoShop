export type MileageLimits = {
  daily?: string;
  weekly?: string;
  twoWeeks?: string;
  monthly?: string;
  annually?: string;
};

export const parsePriceNumber = (value?: string | null) => {
  if (!value) return null;
  const cleaned = String(value).replace(/[^\d.,-]/g, '').replace(/\s+/g, '').replace(',', '.');
  const num = Number(cleaned);
  return Number.isFinite(num) && cleaned !== '' ? num : null;
};

export const parseKmNumber = (value?: string | null) => {
  if (!value) return null;
  const cleaned = String(value).replace(/[^\d.]/g, '').replace(/\s+/g, '');
  const num = Number(cleaned);
  return Number.isFinite(num) && cleaned !== '' ? num : null;
};

export const computeRentalDays = (start?: Date | null, end?: Date | null) => {
  if (!start || !end) return null;
  const diffMs = end.getTime() - start.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return days > 0 ? days : null;
};

export const computeAmountDue = (args: {
  rentalDays: number | null;
  perDay: number | null;
  pickupCost?: number;
  returnCost?: number;
}) => {
  const { rentalDays, perDay, pickupCost = 0, returnCost = 0 } = args;
  if (!rentalDays || !perDay) return null;
  return rentalDays * perDay + pickupCost + returnCost;
};

export const isOutOfHours = (
  dateVal: Date | null,
  timeVal: Date | null,
  startHour = 9,
  endHour = 19,
) => {
  if (!dateVal && !timeVal) return false;
  const dt = new Date(dateVal ?? timeVal ?? new Date());
  const hour = dt.getHours();
  return hour < startHour || hour >= endHour;
};

export const computeMileageLimit = (rentalDays: number | null, limits: MileageLimits) => {
  const km = {
    daily: parseKmNumber(limits.daily),
    weekly: parseKmNumber(limits.weekly),
    twoWeeks: parseKmNumber(limits.twoWeeks),
    monthly: parseKmNumber(limits.monthly),
    annually: parseKmNumber(limits.annually),
  };

  const formatKm = (num: number | null, fallback?: string) => {
    if (num === null) return fallback ?? null;
    return `${num} km`;
  };

  if (!rentalDays) return limits.daily ?? limits.weekly ?? limits.twoWeeks ?? limits.monthly ?? limits.annually ?? null;

  if (rentalDays <= 1) return formatKm(km.daily, limits.daily) ?? null;
  if (rentalDays <= 7) return formatKm(km.weekly, limits.weekly) ?? formatKm(km.daily, limits.daily) ?? null;
  if (rentalDays <= 14) return formatKm(km.twoWeeks, limits.twoWeeks) ?? formatKm(km.weekly, limits.weekly) ?? null;
  if (rentalDays <= 30) return formatKm(km.monthly, limits.monthly) ?? formatKm(km.twoWeeks, limits.twoWeeks) ?? null;

  if (km.monthly !== null) {
    const months = Math.ceil(rentalDays / 30);
    return `${km.monthly * months} km`;
  }
  if (km.annually !== null) {
    const prorated = Math.ceil((km.annually * rentalDays) / 365);
    return `${prorated} km`;
  }
  return limits.monthly ?? limits.annually ?? limits.twoWeeks ?? limits.weekly ?? limits.daily ?? null;
};
