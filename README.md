# Node.js + TypeScript + Vitest + Awilix

Proyecto de ejemplo para practicar pruebas unitarias utilizando TypeScript, Vitest, interfaces, clases e inyección de dependencias con Awilix.

## Instalación

Inicializar el proyecto:

```bash
npm init -y
```

Instalar TypeScript:

```bash
npm install -D typescript @types/node
```

Instalar Vitest:

```bash
npm install -D vitest
```

Instalar Awilix:

```bash
npm install awilix
```

---

## Configuración de TypeScript

Crear el archivo:

```text
tsconfig.json
```

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "types": ["node", "vitest/globals"]
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}

```

---

## Configuración de Vitest

Crear:

```text
vitest.config.ts
```

```ts
import { defaultExclude, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["test/**/*.spec.ts"],

    coverage: {
      ...defaultExclude,
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.ts"],
      exclude: [
        "**/*.spec.ts",
        "**/node_modules/**",
        "src/config/**",
        "src/services/interfaces/**"
      ]
    }
  }
});
```

---

## Ejecutar Vitest

Agregar en `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

Ejecutar:

```bash
npm test
```

---

## Estructura

```text
src/
├── config/
│   └── container.ts
│
└── services/
    ├── calculator.service.ts
    ├── person.service.ts
    │
    └── interfaces/
        ├── calculator.interface.ts
        └── person.interface.ts

test/
├── calculator.service.spec.ts
└── person.service.spec.ts

vitest.config.ts
tsconfig.json
package.json
```

---

# Interfaces

Las interfaces definen el contrato de los servicios.

Ejemplo:

```ts
export interface ICalculatorService {
  add(a: number, b: number): Promise<number>;
  subtract(a: number, b: number): Promise<number>;
  multiply(a: number, b: number): Promise<number>;
}
```

La clase implementa la interfaz:

```ts
export class CalculatorService
  implements ICalculatorService {

  async add(a: number, b: number): Promise<number> {
    return a + b;
  }

  async subtract(a: number, b: number): Promise<number> {
    return a - b;
  }

  async multiply(a: number, b: number): Promise<number> {
    return a * b;
  }
}
```

---

# Prueba unitaria

Ejemplo con Vitest:

```ts
import { describe, it, expect } from "vitest";
import { CalculatorService } from "../src/services/calculator.service";

describe("CalculatorService", () => {

  it("should add two numbers", async () => {

    // Arrange
    const calculator = new CalculatorService();

    // Act
    const result = await calculator.add(5, 10);

    // Assert
    expect(result).toBe(15);

  });

});
```

La prueba utiliza el patrón:

```text
Arrange
Act
Assert
```

---

# Inyección de dependencias

Cuando una clase necesita otra clase, la dependencia se recibe mediante el constructor.

```ts
export class CartService {

  constructor(
    private readonly productService: IProductService
  ) {}

}
```

La clase no crea directamente `ProductService`.

La dependencia se proporciona desde afuera.

---

# Awilix

Awilix permite administrar las dependencias mediante un container.

Instalación:

```bash
npm install awilix
```

Crear:

```text
src/config/container.ts
```

```ts
import {
  asClass,
  createContainer,
  InjectionMode
} from "awilix";

import { PersonService } from "../services/person.service";
import { CalculatorService } from "../services/calculator.service";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({

  personService:
    asClass(PersonService).singleton(),

  calculatorService:
    asClass(CalculatorService).singleton()

});
```

---

# `InjectionMode.CLASSIC`

Con:

```ts
InjectionMode.CLASSIC
```

Awilix utiliza los parámetros del constructor para identificar las dependencias.

Ejemplo:

```ts
class CartService {

  constructor(
    productService: IProductService
  ) {}

}
```

Awilix identifica:

```text
productService
```

y busca una dependencia registrada con ese nombre.

---

# `resolve()`

`resolve()` se utiliza para obtener una dependencia registrada en el container.

Ejemplo:

```ts
const calculatorService =
  container.resolve<CalculatorService>(
    "calculatorService"
  );
```

El nombre:

```text
calculatorService
```

corresponde al nombre utilizado en:

```ts
container.register({
  calculatorService:
    asClass(CalculatorService)
});
```

---

# `new` vs `resolve()`

Sin Awilix:

```ts
const calculatorService =
  new CalculatorService();
```

Con Awilix:

```ts
const calculatorService =
  container.resolve(
    "calculatorService"
  );
```

Cuando una clase tiene dependencias:

```ts
class CartService {

  constructor(
    productService: IProductService
  ) {}

}
```

Awilix puede resolver automáticamente la dependencia:

```text
container.resolve("cartService")
              ↓
         CartService
              ↓
       productService
              ↓
       ProductService
```

Por eso:

* El **constructor** declara las dependencias que necesita una clase.
* `container.register()` registra cómo construirlas.
* `container.resolve()` solicita una dependencia al container.

---

# Ciclo de vida

Awilix permite definir cómo se crean las instancias.

### Singleton

Una instancia para todo el container.

```ts
asClass(CalculatorService).singleton()
```

### Transient

Una instancia nueva cada vez que se hace `resolve()`.

```ts
asClass(CalculatorService).transient()
```

### Scoped

Una instancia por cada scope.

```ts
asClass(CalculatorService).scoped()
```

Resumen:

```text
singleton → una instancia
transient → nueva instancia por resolve
scoped    → una instancia por scope
```

---

# Ejecutar la aplicación

Ejemplo:

```ts
import { container } from "./src/config/container";

async function main() {

  const calculatorService =
    container.resolve(
      "calculatorService"
    );

  const result =
    await calculatorService.add(5, 10);

  console.log("Result:", result);
}

main();
```

La aplicación puede ejecutarse mediante un archivo `index.ts`, mientras que las pruebas se encuentran en la carpeta `test/`.
