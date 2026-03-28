# Boilerplate Playwright API - Automação de Testes de API

## 📋 Sobre o Projeto

Este é um boilerplate de automação de testes para APIs usando **@playwright/test** e **axios**.
A ideia é manter uma arquitetura em camadas, facilitando a manutenção, o reaproveitamento de código e a escalabilidade dos cenários.

---

## 🏗️ Arquitetura do Projeto

A estrutura segue um padrão em **camadas**, separando responsabilidades entre testes, API, core e utils:

### Estrutura de Pastas

```
boilerplate-playwright-api/
├── src/
│   ├── api/                      # Camada de API
│   │   ├── base/
│   │   │   ├── base.api.ts
│   │   │   └── baseDTO.ts
│   │   └── controller/
│   │       └── testApi/
│   │           ├── test.api.ts
│   │           └── testDTO.ts
│   ├── core/                     # Camada de Core
│   │   ├── coreDTO.ts
│   │   └── testCore/
│   │       └── test.core.ts
│   └── utils/                    # Camada de Utilitários
│       ├── logger/logger.ts
│       ├── database/mongoDb.ts
│       └── leituraArquivo/lerArquivo.ts
├── tests/                        # Camada de Testes
│   └── api/
│       └── test.spec.ts
├── allure-results/               # Resultados do Allure
├── test-results/                 # Resultados de execução
├── package.json
└── README.md
```

### Camadas da Arquitetura

#### 1. **Camada de API** (`src/api/`)
- Agrupa toda a lógica de chamada HTTP e contratos de endpoints.
- Encapsula `axios` em um cliente centralizado.
- Responsável por headers, query params, endpoint e formatação de request/response.

**Principais arquivos:**
- `src/api/base/base.api.ts`
  - `HttpClient` com métodos `useGet`, `usePost`, `usePut` e `useDelete`.
- `src/api/base/baseDTO.ts`
  - DTOs e contratos de dados usados pelo cliente HTTP.
- `src/api/controller/testApi/test.api.ts`
  - Serviço de API específico do recurso de teste.
- `src/api/controller/testApi/testDTO.ts`
  - Contratos de request/response para o recurso de teste.

#### 2. **Camada de Core** (`src/core/`)
- Orquestra o fluxo de negócio dos testes.
- Faz validações de contrato e retorna respostas tratadas para os testes.

**Principais arquivos:**
- `src/core/testCore/test.core.ts`
  - Implementa métodos de alto nível como `postTestCore`, `getTestCore`, `putTestCore`, `deleteTestCore`.
- `src/core/coreDTO.ts`
  - Define o payload genérico `ICoreDTO<T>` usado para transportar dados, token e status esperado.

#### 3. **Camada de Testes** (`tests/api/`)
- Contém os cenários de execução reais com Playwright.
- Usa `@playwright/test` para estruturar suites e casos.
- Faz validações finais sobre o retorno do core.

**Principais arquivos:**
- `tests/api/test.spec.ts`
  - Exemplo de suíte de teste de API.

#### 4. **Camada de Utilitários** (`src/utils/`)
- Funções transversais que suportam os testes.
- Helpers de logging, integração com banco e leitura de arquivos.

**Principais utilitários:**
- `src/utils/logger/logger.ts`
- `src/utils/database/mongoDb.ts`
- `src/utils/leituraArquivo/lerArquivo.ts`

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 22+
- Dependências instaladas via `npm install`

### Executar Testes

```bash
npm run api
```

### Executar um teste específico

```bash
npx playwright test tests/api/test.spec.ts
```

### Geração de Relatório

```bash
npm run relatorio
```

---

## 📝 Como Criar um Novo Teste

Para adicionar um novo fluxo, siga os passos abaixo:

### 1. Criar o serviço de API

**Arquivo:** `src/api/controller/<feature>/<feature>.api.ts`

```ts
import { HttpClient } from '../../base/base.api';
import { IFeatureDTO } from './featureDTO';

const httpClient = new HttpClient();

export class FeatureApi {
  static async createFeature(data: IFeatureDTO) {
    return httpClient.usePost({
      url: '/feature',
      body: data,
    });
  }
}
```

### 2. Criar os DTOs

**Arquivo:** `src/api/controller/<feature>/<feature>DTO.ts`

```ts
export interface IFeatureDTO {
  id?: number;
  name: string;
}
```

### 3. Criar a camada de core

**Arquivo:** `src/core/<feature>/<feature>.core.ts`

```ts
import { FeatureApi } from '../../api/controller/feature/feature.api';
import { ICoreDTO } from '../coreDTO';

export class FeatureCore {
  static async createFeature(data: ICoreDTO<IFeatureDTO>) {
    const response = await FeatureApi.createFeature(data.payload);
    expect(response.status).toBe(data.status);
    return response;
  }
}
```

### 4. Criar o teste Playwright

**Arquivo:** `tests/api/feature.spec.ts`

```ts
import { test } from '@playwright/test';
import { FeatureCore } from '../../src/core/feature/feature.core';

test('Criar feature', async () => {
  const data = {
    payload: { name: 'teste' },
    status: 201,
  };

  const response = await FeatureCore.createFeature(data);
  expect(response.data).toBeDefined();
});
```

---

## 📊 Relatórios

O relatório Allure é gerado a partir dos resultados em `allure-results`.

### Como funciona
1. Os testes executam e gravam resultados em `allure-results/`
2. O comando `npm run relatorio` gera o relatório em `allure-report/`
3. A suíte abre automaticamente o relatório gerado

**Para abrir manualmente:**

```bash
npx allure open ./allure-report
```

---

## 📌 Convenções do Projeto

1. Estruture os testes por funcionalidade em `tests/api/`
2. Use `src/api/` apenas para chamadas HTTP
3. Use `src/core/` para regras de negócio e validações comuns
4. Não faça chamadas `axios` diretamente em `tests/`
5. Use `src/utils/` para helpers e integrações transversais

---

## 🎯 Próximos Passos

- Adicionar mais cenários de API
- Implementar integração com CI/CD
- Expandir cobertura de contratos e validações
- Padronizar dados de teste e fixtures



