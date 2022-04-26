import { createNewRent } from './rent';

describe('createNewRent', () => {
  it('テスト', () => {
    expect(createNewRent('2', '1')).toStrictEqual({
      price: 2,
      commonServiceFee: 1,
    });
  });
});
