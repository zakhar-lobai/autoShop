import {
  computeAmountDue,
  computeMileageLimit,
  computeRentalDays,
  isOutOfHours,
  parseKmNumber,
  parsePriceNumber,
} from '../lib/bookingMath';

describe('booking math helpers', () => {
  it('parses price numbers with spaces and currency', () => {
    expect(parsePriceNumber('12 000 PLN')).toBe(12000);
    expect(parsePriceNumber('299,50')).toBeCloseTo(299.5);
    expect(parsePriceNumber('invalid')).toBeNull();
  });

  it('parses km numbers with units and spaces', () => {
    expect(parseKmNumber('3 000 km')).toBe(3000);
    expect(parseKmNumber('250')).toBe(250);
    expect(parseKmNumber('abc')).toBeNull();
  });

  it('computes rental days inclusive of time gap', () => {
    const start = new Date('2025-01-01T12:00:00');
    const end = new Date('2025-01-04T11:59:00');
    expect(computeRentalDays(start, end)).toBe(3);
  });

  it('computes amount due with location costs', () => {
    expect(
      computeAmountDue({ rentalDays: 3, perDay: 100, pickupCost: 20, returnCost: 10 }),
    ).toBe(330);
    expect(computeAmountDue({ rentalDays: null, perDay: 100 })).toBeNull();
    expect(computeAmountDue({ rentalDays: 2, perDay: null })).toBeNull();
  });

  it('scales mileage limit for multi-month rentals', () => {
    const limits = {
      daily: '200 km',
      weekly: '1400 km',
      twoWeeks: '2100 km',
      monthly: '3000 km',
      annually: '36000 km',
    };
    expect(computeMileageLimit(10, limits)).toBe('2100 km');
    expect(computeMileageLimit(35, limits)).toBe('6000 km'); // 2 months of 3000
    expect(computeMileageLimit(400, limits)).toBe('42000 km'); // falls back to annual when monthly unknown
    // when only monthly is known, scales linearly by months (round up months)
    expect(computeMileageLimit(62, { monthly: '3000 km' })).toBe('9000 km');
  });

  it('detects out of hours based on working window', () => {
    const day = new Date('2025-01-01T08:00:00');
    const night = new Date('2025-01-01T20:30:00');
    const business = new Date('2025-01-01T10:00:00');
    const boundaryStart = new Date('2025-01-01T09:00:00');
    const boundaryEnd = new Date('2025-01-01T19:00:00');
    expect(isOutOfHours(day, null)).toBe(true);
    expect(isOutOfHours(night, null)).toBe(true);
    expect(isOutOfHours(business, null)).toBe(false);
    expect(isOutOfHours(boundaryStart, null)).toBe(false);
    expect(isOutOfHours(boundaryEnd, null)).toBe(true);
  });
});
