package domain

import (
	"fmt"
	"scraper-go/domain/rent"
	"scraper-go/domain/room"
)

type Property struct {
	DetailURL, Name, Shikikin, Reikin, NumberOfFloor string
	Room                                             *room.Room
	Rent                                             *rent.Rent
	FloorPlan                                        *FloorPlan
}

func NewProperty(detailURL, name, shikikin, reikin, numberOfFloor string, room *room.Room, rent *rent.Rent, floorPlan *FloorPlan) *Property {
	return &Property{
		DetailURL:     detailURL,
		Name:          name,
		Shikikin:      shikikin,
		Reikin:        reikin,
		NumberOfFloor: numberOfFloor,
		Room:          room,
		Rent:          rent,
		FloorPlan:     floorPlan,
	}
}

func NewProperties(detailURLs, names, shikikins, reikins, numberOfFloors []string, rooms []*room.Room, rents []*rent.Rent, floorPlans []*FloorPlan) ([]*Property, error) {
	detailURLLen, nameLen, shikikinLen, reikinLen, numberOfFloorLen, roomLen, rentLen, floorPlanLen := len(detailURLs), len(names), len(shikikins), len(reikins), len(numberOfFloors), len(rooms), len(rents), len(floorPlans)
	if detailURLLen == 0 || nameLen == 0 || shikikinLen == 0 || reikinLen == 0 || numberOfFloorLen == 0 || roomLen == 0 || rentLen == 0 || floorPlanLen == 0 {
		return nil, fmt.Errorf("not found arguments. detailURL: %d, name: %d, shikikin: %d, reikin: %d, room: %d, rent: %d, floorPlan: %d", detailURLLen, nameLen, shikikinLen, reikinLen, roomLen, rentLen, floorPlanLen)
	}
	if detailURLLen != nameLen || detailURLLen != shikikinLen || detailURLLen != reikinLen || detailURLLen != numberOfFloorLen || detailURLLen != roomLen || detailURLLen != rentLen || detailURLLen != floorPlanLen {
		return nil, fmt.Errorf("incorrect size. detailURL: %d, name: %d, shikikin: %d, reikin: %d, numberOfFloor: %d, room: %d, rent: %d, floorPlan: %d", detailURLLen, nameLen, shikikinLen, reikinLen, numberOfFloorLen, roomLen, rentLen, floorPlanLen)
	}
	var properties []*Property
	for i := 0; i < detailURLLen; i++ {
		property := NewProperty(detailURLs[i], names[i], shikikins[i], reikins[i], numberOfFloors[i], rooms[i], rents[i], floorPlans[i])
		properties = append(properties, property)
	}
	return properties, nil
}
