import { ICalculatorService } from "./interfaces/calculator.interface";


export class CalculatorService implements ICalculatorService {

    async add(a: number, b: number): Promise<number> {
        return a + b;
    }
    
    async subtract(a: number, b: number): Promise<number> {
        return a - b;
    }

    async multiply(a: number, b: number): Promise<number> {
        return a * b;
    }

    async divison(a: number, b: number): Promise<number> {
        if(b  === 0){
            throw new Error("No se aceptan divisiones sobre cero");
        }
        return a / b
        
    }
}