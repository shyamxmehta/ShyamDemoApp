export type Product = {
    Date?: string | null;
    ProductCode?: number | null;
    ProductDescription?: string | null;
    CostPrice?: number | null;
    SellingPrice?: number | null;
    Unit?: string | null;
    Quantity?: number | null;
    StockVal?: number | null;
    Image?: string | null;
    id?: string
}
// export interface Product {
//     Date?: string | null | Date | undefined,
//     ProductCode?: number | undefined,
//     ProductDescription?: string | undefined,
//     CostPrice?: number,
//     SellingPrice?: string, 
//     Unit?: string | null | undefined,
//     Quantity?: number | null | undefined,
//     StockVal?: number | null | undefined,
//     Image? : string | null
// }

export class ProductClass {
    constructor(        
        Date: Date,
        ProductCode: number,
        ProductDescription: string,
        CostPrice: number,
        SellingPrice: string, 
        Unit: string,
        Quantity: number,
        StockVal: number) {

    }
}