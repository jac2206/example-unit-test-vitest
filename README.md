# Node.js + TypeScript + Vitest

Proyecto de práctica para trabajar **pruebas unitarias en Node.js con TypeScript**, aplicando programación orientada a objetos, interfaces, clases, entidades, DTOs, inyección de dependencias y herramientas de calidad de código.

## Tecnologías

* Node.js
* TypeScript
* Vitest
* Awilix
* Biome
* Husky
* Commitlint
* Stryker
* SonarCloud
* GitHub Actions

---

# Instalación

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

Instalar Biome:

```bash
npm install -D @biomejs/biome
```

Instalar Husky:

```bash
npm install -D husky
```

Instalar Commitlint:

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

Instalar Stryker:

```bash
npm install --save-dev @stryker-mutator/core @stryker-mutator/vitest-runner
```

Inicializar Stryker:

```bash
npx stryker init
```

---

# Estructura del proyecto

```text
.github/
└── workflows/
    └── ci-cd.yml

.husky/
├── pre-commit
└── commit-msg

src/
├── config/
│   └── container.ts
│
├── services/
│   ├── calculator.service.ts
│   ├── person.service.ts
│   │
│   ├── entities/
│   │   └── ...
│   │
│   └── interfaces/
│       ├── calculator.interface.ts
│       ├── person.interface.ts
│       └── ...
│
└── index.ts

test/
├── calculator.service.spec.ts
├── person.service.spec.ts
└── ...

biome.json
commitlint.config.json
sonar-project.properties
stryker.config.json
tsconfig.json
vitest.config.ts
package.json
```

---

# TypeScript

Archivo:

```text
tsconfig.json
```

Configuración:

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

# Interfaces

Las interfaces definen **contratos y estructuras de datos**.

Ejemplo:

```ts
export interface ICalculatorService {
  add(a: number, b: number): Promise<number>;
  subtract(a: number, b: number): Promise<number>;
  multiply(a: number, b: number): Promise<number>;
}
```

Una clase puede implementar la interfaz:

```ts
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
}
```

Las interfaces permiten definir qué operaciones debe cumplir una implementación sin definir su comportamiento interno.

---

# Entidades

Las entidades se manejan mediante **clases** cuando tienen comportamiento propio.

Ejemplo:

```ts
export class Order {
  constructor(
    public readonly id: string,
    public readonly products: Products[],
    public readonly total: number,
    public readonly discount: number,
  ) {}

  toPersistence() {
    return {
      id: this.id,
      products: this.products,
      total: this.total,
      discount: this.discount,
    };
  }
}
```

Para crear una instancia de una entidad se utiliza `new`:

```ts
const order = new Order(
  id,
  products,
  total,
  discount,
);
```

Una entidad puede contener reglas y comportamiento:

```ts
order.toPersistence();
```

### Regla utilizada

```text
interface / type → estructuras y contratos

class → entidades y comportamiento

new → crear instancias de clases

as → afirmación de tipo cuando sea necesario
```

`as` no convierte un objeto plano en una instancia de una clase.

---

# DTO

Los DTO representan los datos utilizados para una operación.

Ejemplo:

```ts
export interface CalculateDiscountDto {
  products: Products[];
}
```

Se pueden crear como objetos:

```ts
const dto: CalculateDiscountDto = {
  products,
};
```

No se utiliza `new` porque una `interface` no genera una clase en JavaScript.

---

# Pruebas unitarias

Las pruebas unitarias se realizan utilizando **Vitest**.

Ejemplo:

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

Las pruebas utilizan el patrón **AAA**:

```text
Arrange
   ↓
Act
   ↓
Assert
```

### Arrange

Preparar los datos y dependencias necesarias.

### Act

Ejecutar la operación que se quiere probar.

### Assert

Comprobar el resultado esperado.

---

# Configuración de Vitest

Archivo:

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
        "src/services/interfaces/**",
        "src/services/entities/**",
      ],
    },
  },
});
```

---

# Ejecutar pruebas

Ejecutar Vitest:

```bash
npm test
```

Ejecutar las pruebas una sola vez:

```bash
npm run test:run
```

Generar cobertura:

```bash
npm run test:coverage
```

La cobertura genera:

```text
coverage/
├── lcov.info
└── ...
```

---

# Inyección de dependencias

Cuando una clase necesita otra dependencia, esta se recibe mediante el constructor.

```ts
export class CartService {
  constructor(
    private readonly productService: IProductService,
  ) {}
}
```

La clase no crea directamente `ProductService`.

La dependencia se proporciona desde afuera.

Esto permite:

* Reducir el acoplamiento.
* Facilitar las pruebas unitarias.
* Sustituir implementaciones.
* Separar responsabilidades.

---

# Awilix

**Awilix** permite administrar las dependencias mediante un container.

Archivo:

```text
src/config/container.ts
```

```ts
import {
  asClass,
  createContainer,
  InjectionMode,
} from "awilix";

import { PersonService } from "../services/person.service";
import { CalculatorService } from "../services/calculator.service";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  personService: asClass(PersonService).singleton(),
  calculatorService: asClass(CalculatorService).singleton(),
});
```

---

# InjectionMode.CLASSIC

Con:

```ts
InjectionMode.CLASSIC
```

Awilix identifica las dependencias utilizando los parámetros del constructor.

Ejemplo:

```ts
class CartService {
  constructor(
    productService: IProductService,
  ) {}
}
```

Awilix identifica:

```text
productService
```

y busca una dependencia registrada con ese nombre.

---

# resolve()

`resolve()` obtiene una dependencia registrada en el container.

```ts
const calculatorService =
  container.resolve<CalculatorService>(
    "calculatorService",
  );
```

El nombre:

```text
calculatorService
```

corresponde al nombre utilizado en:

```ts
container.register({
  calculatorService: asClass(CalculatorService),
});
```

---

# new vs resolve()

Sin Awilix:

```ts
const calculatorService =
  new CalculatorService();
```

Con Awilix:

```ts
const calculatorService =
  container.resolve("calculatorService");
```

Cuando una clase tiene dependencias, Awilix puede resolverlas automáticamente.

```text
container.resolve("cartService")
              ↓
         CartService
              ↓
       productService
              ↓
       ProductService
```

### Conceptos principales

```text
constructor
    ↓
Declara las dependencias

container.register()
    ↓
Registra cómo construirlas

container.resolve()
    ↓
Obtiene la dependencia
```

---

# Ciclo de vida de Awilix

## Singleton

Una única instancia para el container:

```ts
asClass(CalculatorService).singleton()
```

## Transient

Una nueva instancia cada vez que se realiza `resolve()`:

```ts
asClass(CalculatorService).transient()
```

## Scoped

Una instancia por cada scope:

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

# Biome

El proyecto utiliza **Biome** para mantener un estándar consistente de formato y calidad de código.

Biome se utiliza para:

* Formatear código.
* Ejecutar linting.
* Organizar imports.
* Aplicar reglas recomendadas para JavaScript y TypeScript.

## Instalación

```bash
npm install -D @biomejs/biome
```

Inicializar:

```bash
npx @biomejs/biome init
```

Esto genera:

```text
biome.json
```

## Formatear

```bash
npm run format
```

Script:

```json
{
  "format": "biome format --write ."
}
```

## Validar

```bash
npm run check
```

Script:

```json
{
  "check": "biome check ."
}
```

---

# Husky

Husky permite ejecutar validaciones automáticamente durante el proceso de commit.

Instalación:

```bash
npm install -D husky
```

Inicialización:

```bash
npx husky init
```

Estructura:

```text
.husky/
├── pre-commit
└── commit-msg
```

## Pre-commit

Archivo:

```text
.husky/pre-commit
```

```sh
#!/usr/bin/env sh

npm run format
npm run check
```

Antes de crear el commit se ejecutan el formateo y la validación de Biome.

---

# Conventional Commits

El proyecto utiliza **Commitlint** para validar los mensajes de commit siguiendo Conventional Commits.

## Instalación

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

## Configuración

Archivo:

```text
commitlint.config.json
```

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

## Commit-msg

Archivo:

```text
.husky/commit-msg
```

```sh
#!/usr/bin/env sh

npx --no -- commitlint --edit "$1"
```

---

# Commits válidos

```bash
git commit -m "feat: add purchase discount service"

git commit -m "fix: resolve discount calculation"

git commit -m "refactor: improve order entity"

git commit -m "test: add calculator service tests"

git commit -m "docs: update project documentation"

git commit -m "chore: update dependencies"
```

Formato:

```text
type: description
```

No debe existir un espacio entre el tipo y `:`.

---

# Pruebas de mutación con Stryker

El proyecto utiliza **Stryker** para realizar pruebas de mutación.

Las pruebas de mutación permiten evaluar la capacidad de las pruebas unitarias para detectar cambios en el comportamiento del código.

Stryker modifica temporalmente el código creando mutaciones y ejecuta las pruebas para comprobar si estas detectan los cambios.

## Instalación

```bash
npm install --save-dev @stryker-mutator/core @stryker-mutator/vitest-runner
```

Inicializar:

```bash
npx stryker init
```

## Configuración

Archivo:

```text
stryker.config.json
```

```json
{
  "$schema": "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  "mutate": [
    "src/**/*.ts",
    "!src/**/*.spec.ts",
    "!src/test.ts",
    "!src/environments/*.ts"
  ],
  "testRunner": "vitest",
  "reporters": [
    "progress",
    "clear-text",
    "html"
  ],
  "concurrency": 4,
  "coverageAnalysis": "perTest"
}
```

## Ejecutar pruebas de mutación

```bash
npm run mutation
```

Script:

```json
{
  "mutation": "stryker run"
}
```

El resultado permite identificar qué mutaciones fueron detectadas por las pruebas y cuáles sobrevivieron.

---

# SonarCloud

El proyecto utiliza **SonarCloud** para analizar la calidad y cobertura del código.

Archivo:

```text
sonar-project.properties
```

Configuración:

```properties
sonar.projectKey=xxxxx
sonar.organization=xxxxx

sonar.sources=src
sonar.tests=test

sonar.typescript.lcov.reportPaths=coverage/lcov.info

sonar.sourceEncoding=UTF-8

sonar.coverage.exclusions=src/index.ts,src/services/interfaces/**,src/services/entities/**,src/config/**
```

La cobertura utilizada por SonarCloud proviene de:

```text
coverage/lcov.info
```

Este archivo se genera mediante:

```bash
npm run test:coverage
```

---

# CI/CD con GitHub Actions

El proyecto utiliza **GitHub Actions** para automatizar las validaciones principales.

Workflow:

```text
.github/
└── workflows/
    └── ci-cd.yml
```

El workflow se ejecuta cuando:

* Se realiza `push` sobre `master`.
* Se crea o actualiza un Pull Request hacia `master`.

## Pipeline

```yaml
name: CI/CD

on:
  push:
    branches:
      - master

  pull_request:
    branches:
      - master

jobs:
  test:
    name: 🧪 Unit Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: "npm"

      - run: npm ci
      - run: npm run test:coverage

  build:
    name: 🏗 Build Check
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: npm ci
      - run: npm run build

  sonar:
    name: 🔎 Sonar Analysis
    runs-on: ubuntu-latest
    needs: build

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: npm ci
      - run: npm run test:coverage

      - name: SonarCloud Scan
        uses: SonarSource/sonarqube-scan-action@v6
        env:
          SONAR_TOKEN: ${{ secrets.TOKEN_SONAR }}
```

## Flujo del pipeline

```text
Push / Pull Request
        ↓
      Unit Tests
        ↓
   Test + Coverage
        ↓
       Build
        ↓
     SonarCloud
```

Cada etapa depende de que la anterior termine correctamente.

```text
test
 ↓
build
 ↓
sonar
```

Si las pruebas fallan, el build no se ejecuta.

Si el build falla, el análisis de SonarCloud no se ejecuta.

---

# Flujo de calidad completo

El proyecto combina validaciones locales y CI/CD.

## Local

```text
git commit
     ↓
  Husky
     ↓
 pre-commit
     ↓
npm run format
     ↓
npm run check
     ↓
  Biome
     ↓
 commit-msg
     ↓
 Commitlint
     ↓
 Conventional Commit
```

## CI/CD

```text
GitHub
   ↓
Push / Pull Request
   ↓
Unit Tests
   ↓
Coverage
   ↓
Build
   ↓
SonarCloud
```

## Análisis de pruebas

```text
Vitest
   ↓
Pruebas unitarias
   ↓
Coverage
   ↓
Stryker
   ↓
Mutation Testing
```

---

# Scripts

Los principales scripts del proyecto son:

```json
{
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "mutation": "stryker run",
    "format": "biome format --write .",
    "check": "biome check ."
  }
}
```

## Desarrollo

```bash
npm run dev
```

## Compilación

```bash
npm run build
```

## Pruebas

```bash
npm test
```

## Pruebas una sola vez

```bash
npm run test:run
```

## Cobertura

```bash
npm run test:coverage
```

## Pruebas de mutación

```bash
npm run mutation
```

## Formatear

```bash
npm run format
```

## Validar

```bash
npm run check
```

---

# Ejecución de la aplicación

La aplicación puede iniciarse desde:

```text
src/index.ts
```

Ejemplo:

```ts
import { container } from "./config/container";

async function main() {
  const calculatorService =
    container.resolve("calculatorService");

  const result =
    await calculatorService.add(5, 10);

  console.log("Result:", result);
}

main();
```

Ejecutar:

```bash
npm run dev
```

---

# Resumen

Este proyecto está orientado a practicar:

* Node.js.
* TypeScript.
* Programación orientada a objetos.
* Interfaces.
* Clases.
* Entidades.
* DTOs.
* Inyección de dependencias.
* Awilix.
* Pruebas unitarias.
* Patrón AAA.
* Cobertura de pruebas.
* Pruebas de mutación con Stryker.
* Calidad de código con SonarCloud.
* Formateo y linting con Biome.
* Git Hooks con Husky.
* Conventional Commits con Commitlint.
* CI/CD con GitHub Actions.
