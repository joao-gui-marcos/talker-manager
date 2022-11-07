# Welcome to the Talker Manager project repository!

### README Translations:

-   [English](/README.en.md)
-   [Portuguese](/README.md)

* * *

## 👨‍💻 What was developed:

-   An application for registering talkers (speakers) was developed in which it is possible to register, view, search, edit and delete information. For this it was done:

1.  Developing a REST API with Express from a`CRUD`(**C**liability**R**ead,**U**update e**D**elete) of speakers (talkers) and;
2.  Development of some endpoints that read and write to a file using the module`fs`.

* * *

## 1 - Crie o endpoint GET`/talker`

<details>
  <summary>A requisição deve retornar o <code>status 200</code> e um array com todas as pessoas palestrantes cadastradas. Exemplo: </summary><br />

```json
[
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Heloísa Albuquerque",
    "age": 67,
    "id": 2,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Ricardo Xavier Filho",
    "age": 33,
    "id": 3,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Marcos Costa",
    "age": 24,
    "id": 4,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
]
```

</details>

<details>
  <summary>Caso não exista nenhuma pessoa palestrante cadastrada a requisição deve retornar o <code>status 200</code> e um array vazio. Exemplo:</summary><br />

```json
[]
```

</details>

## 2 - Crie o endpoint GET`/talker/:id`

<details>
  <summary>A requisição deve retornar o <code>status 200</code> e uma pessoa palestrante com base no <code>id</code> da rota. Por exemplo, ao fazer uma requisição <code>/talker/1</code>, a resposta deve ser:</summary><br />

```json
{
  "name": "Henrique Albuquerque",
  "age": 62,
  "id": 1,
  "talk": { "watchedAt": "23/10/2020", "rate": 5 }
}
```

</details>

<details>
  <summary>Caso não seja encontrada uma pessoa palestrante com base no <code>id</code> da rota, a requisição deve retornar o <code>status 404</code> com o seguinte corpo:</summary><br />
  
  ```json
  {
    "message": "Pessoa palestrante não encontrada"
  }
  ```
</details>

## 3 - Crie o endpoint POST`/login`

The endpoint must receive in the body of the request the fields`email`e`password`and return a 16-character random token. This token will be used by requests for the next project requirements.

<details>
  <summary>O <strong>corpo da requisição</strong> deverá ter seguinte formato:</summary><br />

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

</details>
  
<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />
  
  - O endpoint deverá retornar um código de `status 200` com o token gerado e o seguinte corpo:

```json
{
  "token": "7mqaVRXJSp886CGr"
}
```

-   The endpoint must return a random token each time it is accessed.

</details>

## 4 - Add validations to the endpoint`/login`

The fields received by the request must be validated and, if the values ​​are invalid, the endpoint must return the`status 400`with the respective error message instead of the token.

<details>
  <summary>As regras de validação são:</summary><br />

-   the field`email`is required;
-   the field`email`must have a valid email address;
-   the field`password`is required;
-   the field`password`must be at least 6 characters long.

</details>
  
<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

-   In case the field`email`is not passed or is empty, return a code of`status 400`with the following body:

    ```json
    {
      "message": "O campo \"email\" é obrigatório"
    }
    ```

-   If the email passed is not valid, return a code`status 400`with the following body:

    ```json
    {
      "message": "O \"email\" deve ter o formato \"email@email.com\""
    }
    ```

-   In case the field`password`is not passed or is empty return a code of`status 400`with the following body:

    ```json
    {
      "message": "O campo \"password\" é obrigatório"
    }
    ```

-   If the password is not at least 6 characters long, return a password.`status 400`with the following body:

    ```json
    {
      "message": "O \"password\" deve ter pelo menos 6 caracteres"
    }
    ```

</details>

## 5 - Crie o endpoint POST`/talker`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

-   The endpoint must be able to add a new speaker to its file;

-   The request body should have the following format:

    ```json
    {
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5
      }
    }
    ```

-   The request must have the authentication token in the headers, in the field`authorization`.

    -   If the token is not found, return a code`status 401`, with the following body:

        ```json
        {
          "message": "Token não encontrado"
        }
        ```

    -   If the token is invalid, return a code`status 401`, with the following body:

    -   Tip 💡: A token**valid**is composed of exactly**16 characters**and must be of the type**string**.

        ```json
        {
          "message": "Token inválido"
        }
        ```

-   The field`name`must be at least 3 characters long. It is mandatory.

    -   If the field is not passed or is empty, return a code of`status 400`, with the following body:

        ```json
        {
          "message": "O campo \"name\" é obrigatório"
        }
        ```

    -   If the name does not have at least 3 characters, return a code of`status 400`, with the following body:

        ```json
        {
          "message": "O \"name\" deve ter pelo menos 3 caracteres"
        }
        ```

-   The field`age`must be an integer and only persons of legal age (at least`18 anos`) can be registered. It is mandatory.

    -   If the field is not passed or is empty, return a code of`status 400`, with the following body:

        ```json
        {
          "message": "O campo \"age\" é obrigatório"
        }
        ```

    -   If the speaker is not at least 18 years old, return`status 400`, with the following body:

        ```json
        {
          "message": "A pessoa palestrante deve ser maior de idade"
        }
        ```

    -   The field`talk`must be an object with the keys`watchedAt`e`rate`:

    -   The field`talk`is required.

        -   If the field is not specified, return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"talk\" é obrigatório"
            }
            ```

    -   A chave`watchedAt`is mandatory.

        -   If the key is not informed or is empty, return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"watchedAt\" é obrigatório"
            }
            ```

    -   A chave`watchedAt`must be a date in the format`dd/mm/aaaa`.

        -   If the date does not respect the format`dd/mm/aaaa`return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
            }
            ```

    -   The field`rate`is required.

        -   If the field is not informed or is empty, return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"rate\" é obrigatório"
            }
            ```

    -   A chave`rate`must be an integer from 1 to 5.

        -   If the grade is not an integer from 1 to 5, return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
            }
            ```

-   If everything is ok, return the`status 201`and the person registered.

-   The endpoint must return the`status 201`and the speaker person who was registered, as follows:

    ```json
    {
      "id": 1,
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5
      }
    }
    ```

</details>

## 6 - Crie o endpoint PUT`/talker/:id`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

-   The endpoint must be able to edit a speaker based on the route id, without changing the registered id.

-   The request body should have the following format:

    ```json
    {
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5
      }
    }
    ```

-   The request must have the authentication token in the headers, in the field`authorization`.

    -   If the token is not found, return a code`status 401`, with the following body:

        ```json
        {
          "message": "Token não encontrado"
        }
        ```

    -   If the token is invalid, return a code`status 401`, with the following body:

        ```json
        {
          "message": "Token inválido"
        }
        ```

-   The field`name`must be at least 3 characters long. It is mandatory.

    -   If the field is not passed or is empty, return a code of`status 400`, with the following body:

        ```json
        {
          "message": "O campo \"name\" é obrigatório"
        }
        ```

    -   If the name does not have at least 3 characters, return a code of`status 400`, with the following body:

        ```json
        {
          "message": "O \"name\" ter pelo menos 3 caracteres"
        }
        ```

-   The field`age`must be an integer and only persons of legal age (at least`18 anos`) can be registered. It is mandatory.

    -   If the field is not passed or is empty, return a code of`status 400`, with the following body:

        ```json
        {
          "message": "O campo \"age\" é obrigatório"
        }
        ```

    -   If the speaker is not at least 18 years old, return`status 400`, with the following body:

        ```json
        {
          "message": "A pessoa palestrante deve ser maior de idade"
        }
        ```

-   The field`talk`must be an object with the keys`watchedAt`e`rate`:

    -   The field`talk`is required.

        -   If the field is not specified, return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"talk\" é obrigatório"
            }
            ```

    -   A chave`watchedAt`is mandatory.

        -   If the key is not informed or is empty, return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"watchedAt\" é obrigatório"
            }
            ```

    -   A chave`watchedAt`must be a date in the format`dd/mm/aaaa`.

        -   If the date does not respect the format`dd/mm/aaaa`return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
            }
            ```

    -   The field`rate`is required.

        -   If the field is not informed or is empty, return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"rate\" é obrigatório"
            }
            ```

    -   A chave`rate`must be an integer from 1 to 5.

        -   If the grade is not an integer from 1 to 5, return`status 400`, with the following body:

            ```json
            {
              "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
            }
            ```

-   If everything is ok, return the`status 200`and the edited person.

    -   The endpoint must return the`status 200`and the speaker person that was edited, as follows:

        ```json
        {
          "id": 1,
          "name": "Danielle Santos",
          "age": 56,
          "talk": {
            "watchedAt": "22/10/2019",
            "rate": 4
          }
        }
        ```
    -   Data updated through the endpoint must be persisted in the file`talker.json`.

</details>

## 7 - Crie o endpoint DELETE`/talker/:id`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

-   The request must have the authentication token in the headers, in the field`authorization`.

    -   If the token is not found, return a code`status 401`, with the following body:

        ```json
        {
          "message": "Token não encontrado"
        }
        ```

    -   If the token is invalid, return a code`status 401`, with the following body:

        ```json
        {
          "message": "Token inválido"
        }
        ```

-   The endpoint must delete a speaking person based on the route id. Should return the`status 204`, with no content in the response.

</details>
  
## 8 - Crie o endpoint GET `/talker/search?q=searchTerm`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

-   The endpoint must return an array of speakers that contain the term searched for in the URL's queryParam in their name. Should return the`status 200`, with the following body:

        /search?q=Da

    ```json
    [
      {
        "id": 1,
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 5,
        },
      }
    ]
    ```

-   The request must have the authentication token in the headers, in the field`authorization`.

    -   If the token is not found, return a code`status 401`, with the following body:

        ```json
        {
          "message": "Token não encontrado"
        }
        ```

    -   If the token is invalid, return a code`status 401`, with the following body:

        ```json
        {
          "message": "Token inválido"
        }
        ```

-   Case`searchTerm`is not informed or is empty, the endpoint should return an array with all registered speakers, as in the GET endpoint`/talker`, common`status 200`.

-   If no speaker satisfies the search, the endpoint should return the`status 200`and an empty array.

    **Tip**it is important to be careful that this route does not conflict with the others, since the order of the routes makes a difference in the interpretation of the application

</details>
