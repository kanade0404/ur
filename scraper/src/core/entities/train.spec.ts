import { createTrain } from './train';

describe('createTrain', () => {
  it('ใในใ', () => {
    expect(createTrain('hoge', 'huga')).toStrictEqual({
      name: 'hoge',
      nearestStation: 'huga',
    });
  });
});
