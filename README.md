# Introdução

Implementação da automação de testes funcionais para validação dos contratos nos módulos:

- Pagamentos

Utilizando o framework "playwright" e a lib "Axios" para as chamadas http.

# Padrão arquitetura

A padrão adotado implica na separação de responsabilidades, em src e test.

1. src

- api
- core
- fixtures
- utils

2. tests

- api

A camada "src" contém o "motor" para a execução dos testes, sendo responsável por subsidiar recursos para a execução ou validação dos testes.
**api**: Contém as chamadas HTTPs, sendo injetadas através do base.
**core**: Através da injeção da camada de _api_, fica responsável por ser a camada de transição entre os testes a serem executadas e as chamadas HTTP.
**fixutes**: Responsável pela alocação de mocks ou arquivos base para testes.
**utils**: Responsável pelas funções utilitárias, como geração de dados, formação etc.

A camada "tests" contém os cenários e suites de testes a serem validados.
**api**: Contém a validação dos testes de contrato de acordo com o fluxo esperado.

# Instalação das dependências

Requisitos:

- [node](https://nodejs.org/en/download): + v22.15.1

Deverá realizar a instalação das dependências utilizando o comando `npm install`, após a instalação basta executar os testes.

# Execução dos testes

Poderá ser executados através do tagueamento ou utilizando a interface com base nas extensões usuais para o playwright.
Caso queira realizar a execução com base nos comandos npm, necessário verificar os comandos de script em `package.json`.

# Relatório

Para a geração dos relatórios após a execução, basta utilizar o comando ``npm run relatorio` que será gerado utilizando a lib "allure-report".

# TODO

## Pagamentos

- [ ] Refatoração dos módulos desenvolvidos para redução de repetição de código.
- [x] Desenvolvimento das suites de assinatura.
- [x] Desenvolvimento das suites de pacote extra.
- [x] Desenvolvimento das suites de método de pagamento.
- [x] Desenvolvimento das suites de frete.
- [x] Desenvolvimento das suites de cancelamento.
- [x] Desenvolvimento das suites de plano.
- [x] Desenvolvimento das suites de POS.
- [x] Desenvolvimento das suites de gerenciamento de templates.
- [ ] ~~Incluir cenários de renovação/geração de ciclo.~~ (Não é possível)
- [ ] Validação dos asserts.
- [ ] Apresentação dos cenários para PM/Teach Lead.
- [x] Criação dos relatórios visuais.
- [ ] Mapeamento de mocks para inclusão de envs.
- [ ] Inclusão das tags.
- [x] Criação da pipeline e serviço de relatórios.
