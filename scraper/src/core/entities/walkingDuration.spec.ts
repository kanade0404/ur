import { createWalkingDuration } from './walkingDuration';

describe('createWalkingDuration', () => {
  it('最大値のみ', function () {
    expect(createWalkingDuration(1)).toStrictEqual({ max: 1 });
  });
  it('最小値含む', function () {
    expect(createWalkingDuration(1, 0)).toStrictEqual({ max: 1, min: 0 });
  });
  it('最大値が最小値と同値でエラーになる', () => {
    expect(() => createWalkingDuration(1, 1)).toThrowError(
      'Invalid Argument Error.  max: 1, min: 1',
    );
  });
  it('最大値が最小値より小さいのでエラーになる', () => {
    expect(() => createWalkingDuration(0, 1)).toThrowError(
      'Invalid Argument Error.  max: 0, min: 1',
    );
  });
});
