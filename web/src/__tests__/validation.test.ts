import { parsePriceNumber } from '../utils/pricing';

const isValidEmail = (email: string) => /.+@.+\..+/.test(email);
const isReturnAfterPickup = (start?: Date | null, end?: Date | null) => {
  if (!start || !end) return false;
  return end > start;
};

describe('basic validation', () => {
  it('accepts simple emails used in booking form', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('bad-email')).toBe(false);
  });

  it('checks return after pickup', () => {
    const start = new Date('2025-01-01T10:00:00');
    const endOk = new Date('2025-01-02T10:00:00');
    const endBad = new Date('2025-01-01T09:59:00');
    expect(isReturnAfterPickup(start, endOk)).toBe(true);
    expect(isReturnAfterPickup(start, endBad)).toBe(false);
  });

  it('parses prices with currency text for validation purposes', () => {
    expect(parsePriceNumber('449 PLN/day')).toBe(449);
  });
});
