export interface ITours {
    name: string,
    id: string,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    type: string

}

export interface ITourServerRes {
tours: ITours[]
}