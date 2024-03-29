export const categories = [
  {
    id: 1,
    name: "Imóveis",
    image: "",
  },
  {
    id: 2,
    name: "Livros",
    image: "",
  },
  {
    id: 3,
    name: "Casa",
    image: "",
  },
  {
    id: 4,
    name: "Eletrônicos",
    image: "",
  },
  {
    id: 5,
    name: "Empregos",
    image: "",
  },
  {
    id: 6,
    name: "Serviços",
    image: "",
  },
  {
    id: 7,
    name: "Moda e beleza",
    image: "",
  },
  {
    id: 8,
    name: "Lazer",
    image: "",
  },
];

export const products = [
  {
    id: 1,
    title: "Serviço de limpeza geral",
    price: 70,
    image: "",
    category: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    seller: {name: "Paulo de Tarso", pix: "018-107-551-23", phone:"(61)99858-5218" },
    tags: ["limpeza", "serviço"]
  },
  {
    id: 2,
    title: "TV Samsung 14pol",
    price: 40,
    image: "",
    category: 2,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    seller: {name: "Paulo de Tarso", pix: "018-107-551-23", phone:"(61)99858-5218" },
    tags: ["tv", "eletrônico"]
  },
  {
    id: 3,
    title: "TV LG 32pol",
    price: 50,
    image: "",
    category: 2,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    seller: {name: "Paulo de Tarso", pix: "018-107-551-23", phone:"(61)99858-5218" },
    tags: ["tv", "eletrônico"]
  },
  {
    id: 4,
    title: "Serviços gerais",
    price: 30,
    image: "",
    category: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    seller: {name: "Paulo de Tarso", pix: "018-107-551-23", phone:"(61)99858-5218" },
    tags: ["manutenção", "serviço"]
  },
];

export const mockData = {
  "reference_id": "ex-00001",
  "customer": {
      "name": "Jose da Silva",
      "email": "email@test.com",
      "tax_id": "12345678909",
      "phones": [
          {
              "country": "55",
              "area": "11",
              "number": "999999999",
              "type": "MOBILE"
          }
      ]
  },
  "items": [
      {
          "name": "nome do item",
          "quantity": 1,
          "unit_amount": 500
      }
  ],
  "qr_codes": [
      {
          "amount": {
              "value": 500
          },
          "expiration_date": "2023-08-29T20:15:59-03:00"
      }
  ],
  "shipping": {
      "address": {
          "street": "Avenida Brigadeiro Faria Lima",
          "number": "1384",
          "complement": "apto 12",
          "locality": "Pinheiros",
          "city": "São Paulo",
          "region_code": "SP",
          "country": "BRA",
          "postal_code": "01452002"
      }
  },
  "notification_urls": [
      "https://meusite.com/notificacoes"
  ]
}