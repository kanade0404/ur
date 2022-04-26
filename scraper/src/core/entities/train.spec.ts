import { createTrain } from './train';

describe('createTrain', () => {
  it('テスト', () => {
    expect(createTrain('hoge', 'huga')).toStrictEqual({
      name: 'hoge',
      nearestStation: 'huga',
    });
  });
});
