# Daily Coffee Dose

PRD — Aplicativo de Controle de Ingestão de Café

Objetivo

Desenvolver uma aplicação web para registrar e acompanhar o consumo diário de café.

O foco do MVP é permitir registros rápidos, apresentar estatísticas de consumo e manter um histórico organizado.

Não implementar autenticação, autorização ou gerenciamento de usuários nesta etapa.

Stack

Frontend

 React

 TypeScript

 Tailwind CSS

 shadcn/ui

 Recharts para gráficos

Backend

 Supabase

Estrutura da aplicação

Telas

Dashboard (Home)

Página inicial composta por:

 Gráfico de consumo

 Cards de resumo

 Últimos registros

 Botão para adicionar nova dose

Funcionalidades

1. Dashboard

Cards

Exibir:

 Total de doses consumidas hoje

 Total de café consumido hoje (ml)

 Total de doses na semana

 Média diária de consumo

Gráfico

Gráfico de barras.

Exibir consumo por dia.

Período:

 últimos 7 dias

Cada barra representa:

Data
Quantidade total consumida (ml)

Tabela de últimos registros

Exibir os 5 registros mais recentes.

Colunas:

 Data/Hora

 Quantidade

 Método

 Torra

 Espécie

Ordenação:

Mais recente primeiro.

Botão

Nova Dose

Abre modal.

2. Modal Nova Dose

Cadastro realizado em uma única tela.

Campos obrigatórios.

Quantidade

Botões de seleção.

Valores:

OpçãoVolumePequena50 mlMédia150 mlGrande250 ml

Armazenar:

size
volume_ml

Torra

Botões.

Valores:

 Clara

 Média

 Escura

Espécie

Botões.

Valores:

 Arábica

 Robusta

 Outros

Caso usuário selecione:

Outros

Exibir campo texto:

Nome da espécie

Obrigatório somente quando "Outros" estiver selecionado.

Método de preparo

Botões.

Valores:

 Coado

 Moka

 Prensa Francesa

 Espresso

 Aeropress

 Hario V60

 Chemex

 Sifão

 Turco

Data/Hora

Não exibido ao usuário.

Preenchimento automático.

Valor padrão:

Data/hora atual.

Ações

Botões:

 Cancelar

 Salvar

Após salvar:

 fecha modal

 atualiza gráfico

 atualiza cards

 atualiza tabela

Sem necessidade de recarregar a página.

Modelo de Dados

CoffeeEntry

id: uuid

created_at: timestamp

size:
"small"
| "medium"
| "large"

volume_ml:
number

roast:
"light"
| "medium"
| "dark"

species:
"arabica"
| "robusta"
| "other"

species_custom:
string | null

brewing_method:
"coado"
| "moka"
| "prensa"
| "espresso"
| "aeropress"
| "v60"
| "chemex"
| "sifao"
| "turco"

Enumerações

Size

small
medium
large

Roast

light
medium
dark

Species

arabica
robusta
other

BrewingMethod

coado

moka

prensa

espresso

aeropress

v60

chemex

sifao

turco

Fluxos

Fluxo 1 — Registrar dose

Dashboard

↓

Nova Dose

↓

Seleciona quantidade

↓

Seleciona torra

↓

Seleciona espécie

↓

(se "Outros")

↓

Digita nome

↓

Seleciona preparo

↓

Salvar

↓

Criar registro

↓

Atualizar Dashboard

Fluxo 2 — Visualizar Dashboard

Abrir aplicação

↓

Buscar registros

↓

Calcular estatísticas

↓

Renderizar cards

↓

Renderizar gráfico

↓

Renderizar últimos registros

Regras de Negócio

Quantidade

Mapeamento fixo.

Pequena → 50 ml

Média → 150 ml

Grande → 250 ml

Espécie personalizada

Se:

species == other

Então:

species_custom obrigatório

Caso contrário:

species_custom = null

Data

Sempre utilizar timestamp do momento do salvamento.

Não permitir edição manual.

Casos Extremos

Nenhum registro

Dashboard deve apresentar:

Cards:

0

Gráfico:

Estado vazio.

Tabela:

Mensagem:

Nenhum consumo registrado.

Atualização em tempo real

Após criar um registro:

 atualizar cards

 atualizar gráfico

 atualizar tabela

Sem refresh da página.

Registro inválido

Não permitir salvar quando:

 quantidade não selecionada

 torra não selecionada

 espécie não selecionada

 método não selecionado

 espécie = "Outros" e nome vazio

Grande volume de registros

A tabela deve continuar exibindo apenas os 5 registros mais recentes.

O gráfico deve considerar apenas os últimos 7 dias.

Componentes (shadcn/ui)

Dashboard

 Card

 Table

 Button

 Badge

 Separator

Modal

 Dialog

 Button

 ToggleGroup

 Input

 Label

Gráfico

 Recharts integrado ao layout do shadcn/ui

Estrutura de Pastas

src/

components/
  dashboard/
  charts/
  coffee/
  ui/

pages/
  Dashboard.tsx

hooks/

services/

types/

lib/

Dados de Entrada

Cadastro de dose

{
  size: "small" | "medium" | "large",
  roast: "light" | "medium" | "dark",
  species: "arabica" | "robusta" | "other",
  species_custom?: string,
  brewing_method:
    | "coado"
    | "moka"
    | "prensa"
    | "espresso"
    | "aeropress"
    | "v60"
    | "chemex"
    | "sifao"
    | "turco"
}

Dados de Saída

Dashboard

{
  today_doses: number,
  today_volume_ml: number,
  week_doses: number,
  daily_average_ml: number,
  chart_data: [
    {
      date: string,
      volume_ml: number
    }
  ],
  latest_entries: CoffeeEntry[]
}

Escopo do MVP

Implementar exclusivamente:

 Dashboard com indicadores de consumo

 Gráfico dos últimos 7 dias

 Tabela com os 5 registros mais recentes

 Modal para cadastro rápido de doses

 Persistência dos registros no Supabase

 Atualização automática da interface após novos registros

Não implementar nesta fase:

 Autenticação

 Perfis de usuário

 Metas de consumo

 Notificações

 Exportação de dados

 Edição ou exclusão de registros

 Filtros avançados

 Integrações externas

 Funcionalidades sociais ou compartilhamento de dados

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6a6554d6-b590-4bb8-8768-bc79f394ed7e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
