package room

type Name struct {
	Building, Number string
}

func NewName(building, number string) *Name {
	return &Name{
		building,
		number,
	}
}
