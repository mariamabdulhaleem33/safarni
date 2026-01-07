export type Transmission = "manual" | "automatic"
export type FuelType = "Diesel" | "Petrol" | "Electric"
export interface Car{
    [x: string]: any;
    id: number;
    name: string,
    image: string,
    transmission: Transmission,
    seats: number,
    fuel: FuelType
}