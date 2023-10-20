#  TRANSACTIONS API

## RFs (Requisitos funcionais)
[] Deve ser possível se registrar (Utilizando nome, email e senha);
[] Deve ser possível se autenticar;

## RN (Regras de Negócio)
[] O usuário não poderá se registrar com dois e-mails duplicados;

## RNFs (Requisitos não funcionais)
[] Os dados da aplicação devem estar contidos em um Banco PostgreSQL;
[] A senha do usuário deve estar criptografada;
[] A listagem das transações devem ser paginadas com 20 itens por página.