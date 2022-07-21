import { StringNumber } from './stringNumber';

type Rent = {
  price: number;
  commonServiceFee: number;
};
type CreateNewRent = (
  price: StringNumber,
  commonServiceFee: StringNumber,
) => Rent;
/**
 * @param price
 * @param commonServiceFee
 */
export const createNewRent: CreateNewRent = (price, commonServiceFee) => ({
  price: Number(price),
  commonServiceFee: Number(commonServiceFee),
});
