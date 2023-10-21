#  TRANSACTIONS API

## RFs (Requisitos funcionais)
[ x ] Deve ser possível se registrar (Utilizando nome, email e senha); <br />
[] Deve ser possível se autenticar; <br />
[] Deve ser possível cadastrar uma nova transação; <br />
[] Deve ser possível obter o balanço das transações (Total de entrada, total de saída e o cálculo das duas)
## RN (Regras de Negócio)
[ x ] O usuário não poderá se registrar com dois e-mails duplicados;
[  ] Cada transação deverá possuir dois tipos (<i>income</i> e <i>outcome</i>);

## RNFs (Requisitos não funcionais)
[] Os dados da aplicação devem estar contidos em um Banco PostgreSQL; <br />
[ x ] A senha do usuário deve estar criptografada; <br />
[] A listagem das transações devem ser paginadas com 20 itens por página. <br />
[] O usuário deve ser identificado por um JWT (Json Web Token)