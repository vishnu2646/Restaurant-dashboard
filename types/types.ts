export interface IRestaurant {
    id: number;
    image: string;
    name: string;
    rating: string;
    address: string;
    empCount: number;
}

export interface IMenuProps {
    id: string;
    image: string;
    name: string;
    description: string;
    price: string;
    selected?: boolean;
}

export interface IEmploye {
    id: string;
    image: string;
    name: string;
    position: string;
}