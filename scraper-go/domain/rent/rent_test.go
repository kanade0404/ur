package rent

import (
	"reflect"
	"testing"
)

func TestNewRent(t *testing.T) {
	type args struct {
		price            uint
		commonServiceFee uint
	}
	tests := []struct {
		name string
		args args
		want *Rent
	}{
		{
			name: "basic",
			args: args{price: 1, commonServiceFee: 1},
			want: &Rent{1, 1},
		},
		{
			name: "zero to price",
			args: args{0, 1},
			want: &Rent{0, 1},
		},
		{
			name: "zero to commonServiceFee",
			args: args{1, 0},
			want: &Rent{1, 0},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewRent(tt.args.price, tt.args.commonServiceFee); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewRent() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestNewRents(t *testing.T) {
	type args struct {
		prices            []uint
		commonServiceFees []uint
	}
	tests := []struct {
		name    string
		args    args
		want    []*Rent
		wantErr bool
	}{
		{
			name:    "basic",
			args:    args{[]uint{1, 2}, []uint{1, 2}},
			want:    []*Rent{&Rent{1, 1}, &Rent{2, 2}},
			wantErr: false,
		},
		{
			name:    "error occurs because length in prices and commonServiceFees do not match",
			args:    args{[]uint{1, 2}, []uint{1}},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NewRents(tt.args.prices, tt.args.commonServiceFees)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewRents() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewRents() got = %v, want %v", got, tt.want)
			}
		})
	}
}
