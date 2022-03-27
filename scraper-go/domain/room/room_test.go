package room

import (
	"reflect"
	"testing"
)

func TestNewRoom(t *testing.T) {
	type args struct {
		image string
		name  *Name
	}
	tests := []struct {
		name string
		args args
		want *Room
	}{
		{
			name: "basic",
			args: args{"path/to/image", &Name{"building", "1"}},
			want: &Room{"path/to/image", &Name{"building", "1"}},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewRoom(tt.args.image, tt.args.name); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewRoom() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestNewRooms(t *testing.T) {
	type args struct {
		images []string
		names  []*Name
	}
	tests := []struct {
		name    string
		args    args
		want    []*Room
		wantErr bool
	}{
		{
			name: "basic",
			args: args{[]string{"/path/to/image"}, []*Name{&Name{"building", "1"}}},
			want: []*Room{&Room{"/path/to/image", &Name{"building", "1"}}},
		},
		{
			name:    "error occurs because length in images and names do not match",
			args:    args{[]string{"/path/to/image", "/path/to/img"}, []*Name{&Name{"building", "1"}}},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NewRooms(tt.args.images, tt.args.names)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewRooms() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewRooms() got = %v, want %v", got, tt.want)
			}
		})
	}
}
