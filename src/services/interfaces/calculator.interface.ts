export interface ICalculatorService {
    add(a: number, b: number): Promise<number>;
    subtract(a: number, b: number): Promise<number>;
    multiply(a: number, b: number): Promise<number>;
    divison(a: number, b: number): Promise<number>;
}