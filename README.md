# Introdução

Este projeto é um boilerplate de automação de testes para APIs com foco em validação de contratos e fluxos de negócio.
A base utiliza `@playwright/test` para execução de suites e `axios` para chamadas HTTP.

Exemplo utilizado: https://fakestoreapi.com/

# Arquitetura aplicada

A arquitetura segue o padrão de camadas, evitando acoplamento entre:

- `src/api`
- `src/core`
- `src/fixtures`
- `src/utils`
- `tests/api`

## Camada `src/api`

Responsável por encapsular as requisições HTTP e os contratos de cada recurso.

- `src/api/base/base.api.ts`
  - `HttpClient`: wrapper genérico de `axios` com métodos `useGet`, `usePost`, `usePut` e `useDelete`.
  - Faz tratamento comum de headers, query params, `validateStatus` e logging de erros.
- `src/api/base/baseDTO.ts`
  - Define interfaces de request/response usadas pelo `HttpClient`.
- `src/api/controller/...`
  - Cada recurso deve ter sua própria pasta e implementação de serviço API.
  - Exemplo: `src/api/controller/testApi/test.api.ts` contém os métodos específicos de CRUD para o recurso de teste.

## Camada `src/core`

Responsável pela orquestração do fluxo de testes e validação de contrato.

- `src/core/testCore/test.core.ts`
  - Importa serviços de API (`TestApi`) e expõe métodos de negócio como `postTestCore`, `getTestCore`, `putTestCore`, `deleteTestCore`.
  - Realiza verificações de status usando `expect` antes de devolver a resposta para os testes.
- `src/core/coreDTO.ts`
  - Define o payload genérico `ICoreDTO<T>` usado para transportar dados, token e status esperado entre testes e core.

## Camada `tests/api`

Contém os cenários de execução reais.

- `tests/api/test.spec.ts`
  - Usa `@playwright/test` para definir suites e testes.
  - Cria casos de uso com dados, chama o `TestCore` e faz asserções finais sobre o payload retornado.

## Camada `src/fixtures`

Responsável por dados de teste, mocks, caminhos de arquivos e fixtures de suporte.

- Use `src/fixtures/data` para armazenar exemplos de payloads, bases de dados de teste ou arquivos JSON.

## Camada `src/utils`

Funções utilitárias gerais, helpers e serviços transversais.

- Exemplo: `src/utils/logger/logger.ts` para registrar mensagens de erro e debug.
- `src/utils/database/mongoDb.ts` para integração com MongoDB, quando necessário.
- `src/utils/leituraArquivo/lerArquivo.ts` para carregar dados de arquivos.

# Como implementar novas features

Para adicionar um novo recurso ou endpoint, siga este padrão por camada.

1. Criar os contratos DTO
   - Adicione interfaces de request/response em `src/api/controller/<feature>/<feature>DTO.ts`.
   - Exemplo: `IPostUser`, `IGetUser`, `IResponseUser`.

2. Criar o serviço de API
   - Adicione `src/api/controller/<feature>/<feature>.api.ts`.
   - Importe `HttpClient` de `src/api/base/base.api.ts`.
   - Use métodos `useGet`, `usePost`, `usePut` ou `useDelete`.
   - Deixe o serviço responsável apenas por chamada HTTP, endpoint e headers.

3. Criar a camada de core
   - Adicione `src/core/<feature>/<feature>.core.ts`.
   - Importe o serviço de API criado na etapa anterior.
   - Crie métodos que recebem `ICoreDTO<T>` e executam as chamadas de API.
   - Realize asserções de contrato de forma centralizada nessa camada.
     - Exemplo: `expect(response.status).toBe(data.status);`
   - Não coloque lógica de requisição HTTP diretamente no `core`.

4. Criar os testes
   - Adicione um novo arquivo em `tests/api/<feature>.spec.ts` ou expanda um arquivo existente.
   - Use `test.describe` e `test('...', async () => { ... })`.
   - Monte os dados de entrada e o status esperado.
   - Chame os métodos do core e, se necessário, adicione asserções de contrato adicionais.
   - Nunca use `axios` diretamente em `tests`; sempre passe pelo `core`.

5. Usar fixtures e utils quando necessário
   - Se precisar de dados estáticos ou de massa, coloque em `src/fixtures/data`.
   - Se precisar de rotina de leitura, formatação ou geração de valores, coloque em `src/utils`.

# Convenções de responsabilidade

- `src/api`: apenas chamada HTTP, endpoints e contratos.
- `src/core`: fluxo de negócio, transformações e validações de status/contrato.
- `tests/api`: definição de cenários, dados de teste e validações finais.
- `src/fixtures`: dados de suporte e mocks.
- `src/utils`: funções utilitárias reutilizáveis.

# Instalação

Requisitos:

- Node.js v22.15.1 ou superior

Instale as dependências com:

```bash
npm install
```

# Execução dos testes

Execute as suítes com:

```bash
npm run api
```

# Relatórios

Gere e abra o relatório Allure com:

```bash
npm run relatorio
```


