import { CurrencyPipe } from "@angular/common";

export interface Produto{
    produtoId: string;
    nome: string;
    quantidade: number;
    valorUnit: number;
    isComprado: boolean;

}