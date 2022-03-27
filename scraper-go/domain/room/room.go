package room

import "fmt"

type Room struct {
	Image string
	*Name
}

func NewRoom(image string, name *Name) *Room {
	return &Room{
		image, name,
	}
}
func NewRooms(images []string, names []*Name) ([]*Room, error) {
	imageLen, nameLen := len(images), len(names)
	if imageLen == 0 || nameLen == 0 {
		return nil, fmt.Errorf("not found parameters. image: %d, name: %d", imageLen, nameLen)
	}
	if imageLen != nameLen {
		return nil, fmt.Errorf("incorrect size. image: %d, name: %d", imageLen, nameLen)
	}
	var rooms []*Room
	for i := 0; i < imageLen; i++ {
		rooms = append(rooms, NewRoom(images[i], names[i]))
	}
	return rooms, nil
}
