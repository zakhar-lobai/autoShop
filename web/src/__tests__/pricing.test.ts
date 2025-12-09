import { computeAmountDue, parsePriceNumber } from '../utils/pricing';

describe('pricing utils', () => {
  it('parses price numbers with currency and spaces', () => {
    expect(parsePriceNumber('12 000 PLN')).toBe(12000);
    expect(parsePriceNumber('299,50')).toBeCloseTo(299.5);
  });

  it('computes amount due with pickup/return fees', () => {
    expect(computeAmountDue({ rentalDays: 5, perDay: 100, pickupCost: 20, returnCost: 10 })).toBe(530);
    expect(computeAmountDue({ rentalDays: null, perDay: 100 })).toBeNull();
  });
});
