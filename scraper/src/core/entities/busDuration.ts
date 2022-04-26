/**
 * @type BusDuration
 * @description 最寄駅からバスでの所要時間
 * 範囲がないものは最大N分かかるとして考える
 */
type BusDuration = {
  min?: number;
  max: number;
};
type CreateBusDuration = (max: number, min?: number) => BusDuration;
/**
 * @param max
 * @param min
 */
export const createBusDuration: CreateBusDuration = (max, min) => {
  if (min === void 0) {
    return { max };
  }
  if (!(max > min))
    throw new Error(`Invalid Argument Error.  max: ${max}, min: ${min}`);
  return { max, min };
};
