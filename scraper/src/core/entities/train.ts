/**
 * @type Train
 * @description 最寄駅の電車情報
 */
import { NearestStation } from './nearestStation';
import { TrainName } from './trainName';

type Train = {
  name: TrainName;
  nearestStation: NearestStation;
};
type CreateTrain = (name: TrainName, nearestStation: NearestStation) => Train;
/**
 * @param name
 * @param nearestStation
 */
export const createTrain: CreateTrain = (name, nearestStation) => ({
  name,
  nearestStation,
});
