import { createNewRent } from './rent';

describe('createNewRent', () => {
  it('ใในใ', () => {
    expect(createNewRent('2', '1')).toStrictEqual({
      price: 2,
      commonServiceFee: 1,
    });
  });
});
