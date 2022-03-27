package rent

import "fmt"

type Rent struct {
	Price, CommonServiceFee uint
}

func NewRent(price, commonServiceFee uint) *Rent {
	return &Rent{price, commonServiceFee}
}

func NewRents(prices, commonServiceFees []uint) ([]*Rent, error) {
	priceLen, commonServiceFeeLen := len(prices), len(commonServiceFees)
	if priceLen == 0 || commonServiceFeeLen == 0 {
		return nil, fmt.Errorf("not found arguments. price: %d, CommonServiceFee: %d", priceLen, commonServiceFeeLen)
	}
	if priceLen != commonServiceFeeLen {
		return nil, fmt.Errorf("incorrect size. price: %d, CommonServiceFee: %d", priceLen, commonServiceFeeLen)
	}
	var rents []*Rent
	for i := 0; i < priceLen; i++ {
		rents = append(rents, NewRent(prices[i], commonServiceFees[i]))
	}
	return rents, nil
}
