#  TRANSACTIONS API

## RFs (Requisitos funcionais)
[ x ] Deve ser possível se registrar (Utilizando nome, email e senha); <br />
[ x ] Deve ser possível se autenticar; <br />
[ x ] Deve ser possível cadastrar uma nova transação; <br />
[  ] Deve ser listar todas as transações de um usuário; <br />
[  ] Deve ser possível obter o balanço das transações (Total de entrada, total de saída e o cálculo das duas)

## RN (Regras de Negócio)
[ x ] O usuário não poderá se registrar com dois e-mails duplicados;
[ x ] Cada transação deverá possuir dois tipos (<i>income</i> e <i>outcome</i>);
[  ] Não deve ser possível criar uma nova transação do tipo <i>outcome</i> caso ela ultrapasse o valor total do balanço

## RNFs (Requisitos não funcionais)
[] Os dados da aplicação devem estar contidos em um Banco PostgreSQL; <br />
[ x ] A senha do usuário deve estar criptografada; <br />
[] A listagem das transações devem ser paginadas com 20 itens por página. <br />
[] O usuário deve ser identificado por um JWT (Json Web Token)