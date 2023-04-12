import { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import axios from "../../http";

const ShowSale = () => {
  const { saleData } = useContext(AppContext);
  const [sale, setSale] = useState({
    "products": {
      "title": "Kit Casa Conectada Positivo Casa Inteligente",
      "price": 203,
    },
    "users": {
      "id": 1,
      "firstName": "Fulanoa",
      "lastName": "Um",
      "email": "fulanoaum@hefestos.com",
      "cpf": "01810755123",
      "password": "123456",
      "cellPhone": "61998585218",
      "whatsapp": "61998585218"
    },
    "cep": "72010010",
    "state": "DF",
    "country": "BRA",
    "city": "Taguatinga",
    "complement": "",
    "number": 15,
    "street": "Taguatinga Norte (Taguatinga)",
    "locality": "QNE 21"
    });

  const getSaleInfo = async () => {
    try {
      const result = await axios.get(
        `/sale/product/${saleData}`
      );
      setSale(result.data);
      console.log(sale);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSaleInfo();
  }, [])

  return (
    <>
        <h1 className="text-green-900 font-bold text-2xl">Detalhes da venda:</h1>
        <section className="text-green-900 mt-5">
          <p className="mb-3">
            <span className="font-bold">Título: </span>
            { sale.products.title }
          </p>
          <p className="mb-3">
            <span className="font-bold">Valor: </span>
            { sale.products.price }
          </p>
          <p className="mb-3">
            <span className="font-bold">Nome: </span>
            { `${sale.users.firstName} ${sale.users.lastName}` }
          </p>
          <p className="mb-3">
            <span className="font-bold">Email: </span>
            { sale.users.email }
          </p>
          <p className="mb-3">
            <span className="font-bold">Celular: </span>
            { sale.users.cellPhone }
          </p>
          <p className="mb-3">
            <span className="font-bold">Whatsapp: </span>
            { sale.users.whatsapp }
          </p>
          <p className="mb-3">
            <span className="font-bold">CEP: </span>
            { sale.cep }
          </p>
          <p className="mb-3">
            <span className="font-bold">Estado: </span>
            { sale.state }
          </p>
          <p className="mb-3">
            <span className="font-bold">Cidade: </span>
            { sale.city }
          </p>
          <p className="mb-3">
            <span className="font-bold">Localidade: </span>
            { sale.locality }
          </p>
          <p className="mb-3">
            <span className="font-bold">Rua: </span>
            { sale.street }
          </p>
          <p className="mb-3">
            <span className="font-bold">Número: </span>
            { sale.number }
          </p>
          <p className="mb-3">
            <span className="font-bold">Complemento: </span>
            { sale.complement }
          </p>
        </section>
    </>
  )
}

export default ShowSale;