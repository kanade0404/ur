import { ElementHandle } from 'puppeteer';
import { isString } from './guard';

type QueryBySelectorProperty = (
  el: ElementHandle,
  sel: string,
  prop: string,
) => Promise<string | null>;
const queryBySelectorProperty: QueryBySelectorProperty = async (
  el,
  sel,
  prop,
) => {
  const targetEl = await el.$(sel);
  if (!targetEl) return null;
  const targetProp = await targetEl.getProperty(prop);
  if (!targetProp) return null;
  const propVal = await targetProp.jsonValue();
  return isString(propVal) ? propVal : null;
};

type WalkingDuration = number;
type WalkingDurationRange = {
  min: number;
  max: number;
};
export const getWalkDuration = (
  walkDuration: string,
): WalkingDuration | WalkingDurationRange => {
  const _walkDuration = walkDuration
    .split('～')
    .map((text) => text.replace(/[^0-9]/g, ''))
    .map(Number);
  return _walkDuration.length > 1
    ? {
        min: _walkDuration[0],
        max: _walkDuration[1],
      }
    : _walkDuration[0];
};
type BusDuration = number;
type BusDurationRange = {
  min: number;
  max: number;
};
export const getBusDuration = (
  busDuration: string,
): BusDuration | BusDurationRange => {
  const _busDuration = busDuration
    .split('～')
    .map((text) => text.replace(/[^0-9]/g, ''))
    .map(Number);
  return _busDuration.length > 1
    ? { min: _busDuration[0], max: _busDuration[1] }
    : _busDuration[0];
};
type TrainName = string;
type NearestStation = string;
type TrainInfo = {
  trainName: TrainName;
  nearestStation: NearestStation;
};
export const getTrainInfo = (trainInfo: string): TrainInfo => {
  const [train, station] = trainInfo.split('線');
  return {
    trainName: `${train}線`,
    nearestStation: station ? station.replace(/[「」駅]/g, '') : '',
  };
};

type AccessInfo = {
  train: TrainInfo;
  walk: WalkingDuration | WalkingDurationRange;
  bus?: BusDuration | BusDurationRange;
};

/**
 * バス移動含む物件アクセス情報の正規化
 * @param accessText
 */
export const normalizeAccessIncludeBusDuration = (
  accessText: string,
): AccessInfo => {
  const [trainInfo, busAndWalkInfo] = accessText.split('バス');
  const [busInfo, walkInfo] = busAndWalkInfo.split(' ');

  return {
    train: getTrainInfo(trainInfo),
    walk: getWalkDuration(walkInfo),
    bus: getBusDuration(busInfo),
  };
};
/**
 * @desc バス移動含まない物件アクセス情報の正規化
 * @param accessText
 */
export const normalizeAccessNoIncludeBus = (accessText: string): AccessInfo => {
  const [trainInfo, walkInfo] = accessText.split(' ');
  return {
    train: getTrainInfo(trainInfo),
    walk: getWalkDuration(walkInfo),
  };
};

/**
 * @desc 物件アクセス情報の正規化
 * @param accessText
 */
export const normalizeAccess = (accessText: string): AccessInfo => {
  /**
   * <路線><駅><?バス所要時間> <徒歩所要時間>
   * バスがあるなら"バス"でsplitして<路線><駅>と<バス所要時間><徒歩所要時間>にsplitして更に正規化する。
   * バスがないなら<路線><駅>と徒歩所要時間>にsplitして更に正規化する。
   */
  const isContainBusDuration = accessText.includes('バス');

  return isContainBusDuration
    ? normalizeAccessIncludeBusDuration(accessText)
    : normalizeAccessNoIncludeBus(accessText);
};

/**
 * @desc 物件アクセス情報取得
 */
type GetAccesses = (
  accessElement: ElementHandle<Element>,
) => Promise<AccessInfo[]>;
const getAccesses: GetAccesses = async (accessElement) => {
  const text = await (await accessElement.getProperty('innerText')).jsonValue();
  if (!isString(text)) return [];
  return text.split('\n').map(normalizeAccess);
};

type RoomName = {
  building: string;
  number: string;
};
type GetRoomName = (element: ElementHandle) => Promise<RoomName | null>;
const getRoomName: GetRoomName = async (element) => {
  const building = await queryBySelectorProperty(
    element,
    '.rep_room-name-main',
    'textContent',
  );
  const roomNumber = await queryBySelectorProperty(
    element,
    '.rep_room-name-sub',
    'textContent',
  );
  return building && roomNumber
    ? {
        building,
        number: roomNumber,
      }
    : null;
};
type Rent = {
  price: number;
  commonServiceFee: number;
};
type GetRent = (element: ElementHandle<Element>) => Promise<Rent | null>;
const getRent: GetRent = async (element) => {
  const price = await queryBySelectorProperty(
    element,
    '.item_price.rep_room-price',
    'textContent',
  );
  const commonServiceFee = await queryBySelectorProperty(
    element,
    '.item_commonfee.rep_room-commonfee',
    'textContent',
  );
  return price && commonServiceFee
    ? {
        price: Number(price.replace(/[,円]/g, '')),
        commonServiceFee: Number(commonServiceFee.replace(/[,()円]/g, '')),
      }
    : null;
};
type FloorPlan = {
  type: string;
  floor: string;
};
type GetFloorPlan = (
  element: ElementHandle<Element>,
) => Promise<FloorPlan | null>;
const getFloorPlan: GetFloorPlan = async (element) => {
  const type = await queryBySelectorProperty(
    element,
    '.rep_room-type',
    'textContent',
  );
  const floor = await queryBySelectorProperty(
    element,
    '.rep_room-floor',
    'textContent',
  );
  return type && floor ? { type, floor } : null;
};

type GetNumberOfFloors = (element: ElementHandle) => Promise<string | null>;
const getNumberOfFloors: GetNumberOfFloors = async (element) => {
  const floors = await queryBySelectorProperty(
    element,
    '.rep_room_kai',
    'textContent',
  );
  return floors ? floors : null;
};
type Room = {
  img: string | null;
  name: RoomName | null;
};
type GetRoomInfo = (element: ElementHandle) => Promise<Room[]>;
const getRoomInfo: GetRoomInfo = async (element) => {
  const roomsElement = await element.$$('.js-log-item.js-room-pict');
  const getRoom = async (roomElement: ElementHandle): Promise<Room> => ({
    img: await queryBySelectorProperty(
      roomElement,
      '.rep_room-madori-src.rep_room-name-alt',
      'src',
    ),
    name: await getRoomName(roomElement),
  });
  return Promise.all([...roomsElement].map(getRoom));
};

export type Property = {
  detailURL: string | null;
  propertyName: string | null;
  accesses: AccessInfo[][];
  shikikin: string | null;
  reikin: string | null;
  rooms: Room[];
  rent: Rent | null;
  floorPlan: FloorPlan | null;
  numberOfFloors: string | null;
};

/**
 * @desc 物件情報の取得
 */
type GetPropertyInfo = (element: ElementHandle<Element>) => Promise<Property>;
export const getPropertyInfo: GetPropertyInfo = async (element) => {
  return {
    detailURL: await queryBySelectorProperty(
      element,
      '.rep_bukken-link',
      'href',
    ),
    propertyName: await queryBySelectorProperty(
      element,
      '.rep_bukken-name',
      'textContent',
    ),
    accesses: await Promise.all(
      [...(await element.$$('.rep_bukken-access'))].map(getAccesses),
    ),
    address: await queryBySelectorProperty(
      element,
      '.rep_bukken-address',
      'textContent',
    ),
    shikikin: await queryBySelectorProperty(
      element,
      '.rep_bukken-count-shikikin',
      'textContent',
    ),
    reikin: await queryBySelectorProperty(
      element,
      '.rep_bukken-count-reikin',
      'textContent',
    ),
    rooms: await getRoomInfo(element),
    rent: await getRent(element),
    floorPlan: await getFloorPlan(element),
    numberOfFloors: await getNumberOfFloors(element),
  };
};
