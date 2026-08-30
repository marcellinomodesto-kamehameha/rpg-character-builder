import { TestBed } from '@angular/core/testing';
import { DiceService } from './dice.service';

describe('DiceService', () => {
  let service: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceService);
  });

  it('should return a result within the inclusive range', () => {
    for (let i = 0; i < 100; i++) {
      const result = service.roll(6);

      expect(Number.isInteger(result)).toBeTrue();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    }
  });

  it('should throw RangeError for invalid sides', () => {
    expect(() => service.roll(1)).toThrowError(RangeError);
    expect(() => service.roll(0)).toThrowError(RangeError);
    expect(() => service.roll(-6)).toThrowError(RangeError);
    expect(() => service.roll(6.5)).toThrowError(RangeError);
  });
});
