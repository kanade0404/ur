import { createBusDuration } from './busDuration';

describe('BusDuration', () => {
  it('最大値のみ', () =>
    expect(createBusDuration(1)).toStrictEqual({ max: 1 }));
  it('最小値含む', () =>
    expect(createBusDuration(1, 0)).toStrictEqual({ max: 1, min: 0 }));
  it('最大値が最小値と同値でエラーになる', () =>
    expect(() => createBusDuration(1, 1)).toThrowError(
      'Invalid Argument Error.  max: 1, min: 1',
    ));
  it('最大値が最小値より小さいのででエラーになる', () =>
    expect(() => createBusDuration(0, 1)).toThrowError(
      'Invalid Argument Error.  max: 0, min: 1',
    ));
});
