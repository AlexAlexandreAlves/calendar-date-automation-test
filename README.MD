# Calendar Date Automation Test

Projeto de testes automatizados utilizando [Playwright](https://playwright.dev/) que valida o fluxo de consultas de datas em um calendário. O projeto adota o **Flow Model Pattern** para organizar e simplificar a interação com as páginas, tornando os testes mais legíveis, reutilizáveis, de fácil ampliacação e manutenção.

## Tecnologias Utilizadas
```
"@playwright/test": "^1.54.1",
"@types/node": "^24.1.0"
```

## Contexto

O padrão adotado para o desenvolvimento foi o **Flow Model**. Esse padrão encapsula operações complexas de páginas em classes de fluxo, expondo métodos de alto nível para os testes, sem que eles precisem conhecer detalhes de implementação dos elementos da interface.

## Sobre o Flow Model Pattern

O **Flow Model Pattern** complementa o POM, fornecendo uma camada que abstrai os detalhes de interação com a interface e oferece uma visão mais orientada a comportamento. Isso resulta em testes mais limpos, focados em “o que” está sendo testado, e não em “como”.

**Exemplo:**
```typescript
const queryDateFlow = new QueryDateFlow(page);
await queryDateFlow.setDateAndRunQuery('4', '5', '1', '2024', '25', '11', '2025');
```

## Estrutura do Projeto

- `src/ui/pages/`: Page Objects com os elementos e ações de cada página.
- `src/ui/flows/`: Classes de fluxo que encapsulam interações complexas com as páginas.
- `src/tests/`: Arquivos de teste automatizados.
- `playwright.config.ts`: Configuração do Playwright (incluindo baseURL).

## Comandos Essenciais

- **Executar todos os testes:**
  ```
  npx playwright test
  ```

- **Executar testes em modo UI interativo:**
  ```
  npx playwright test --ui
  ```

- **Executar testes em um navegador específico:**
  ```
  npx playwright test --project=chromium
  ```

- **Executar um arquivo de teste específico:**
  ```
  npx playwright test tests/calendar-range.test.ts
  ```

- **Executar em modo debug:**
  ```
  npx playwright test --debug
  ```

- **Gerar testes automaticamente com Codegen:**
  ```
  npx playwright codegen
  ```


## Requisitos

- Node.js instalado
- Dependências instaladas com:
  ```
  npm install
  ```

## Observações

- O projeto utiliza `baseURL` configurado no `playwright.config.ts`, permitindo o uso de caminhos relativos nos testes.
- Como a aplicação de exemplo não possui banco de dados persistente, os dados criados existem apenas durante a sessão.
