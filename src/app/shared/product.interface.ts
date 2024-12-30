export interface Product {
    Date?: string | null | Date | undefined,
    ProductCode?: number | undefined,
    ProductDescription?: string | undefined,
    CostPrice?: number,
    SellingPrice?: string, 
    Unit?: string | null | undefined,
    Quantity?: number | null | undefined,
    StockVal?: number | null | undefined,
    Image? : string | null
}

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