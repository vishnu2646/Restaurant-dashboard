export interface IRestaurant {
    id: number;
    image: string;
    restaurantName: string;
    rating: number;
    address: string;
    employeesCount: number;
}

export interface IMenuProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

export interface IEmploye {
    image: string;
    name: string;
    position: string;
}