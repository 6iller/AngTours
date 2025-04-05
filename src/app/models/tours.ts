export interface ITour {
    name: string,
    id: string,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    type: string,
    locationId: string,
    date: Date

}

export interface ITourServerRes {
tours: ITour[]
}