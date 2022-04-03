/**
 * @type WalkingDuration
 * @description 最寄えきから徒歩での所要時間
 *
 */
type WalkingDuration = {
  min?: number;
  max: number;
};
type CreateWalkingDuration = (max: number, min?: number) => WalkingDuration;
/**
 * @param max
 * @param min
 */
export const createWalkingDuration: CreateWalkingDuration = (max, min) => {
  if (min === void 0) {
    return { max };
  }
  if (!(max > min))
    throw new Error(`Invalid Argument Error.  max: ${max}, min: ${min}`);
  return {
    max,
    min,
  };
};
