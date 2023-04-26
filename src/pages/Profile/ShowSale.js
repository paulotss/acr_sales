import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../http";
import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';

const ShowSale = () => {
  const { id } = useParams();
  const [sale, setSale] = useState({
    products: {
      title: "",
      price: "",
    },
    users: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      cpf: "",
      password: "",
      cellPhone: "",
      whatsapp: ""
    },
    cep: "",
    state: "",
    country: "",
    city: "",
    complement: "",
    number: "",
    street: "",
    locality: ""
    });

  const getSaleInfo = async () => {
    try {
      const result = await axios.get(
        `/sale/product/${id}`
      );
      setSale(result.data);
      console.log(sale);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSaleInfo();
  }, []);

  return (
    <>
      <Head />
      <HeadTitle title="Profile" />
      <section className="flex">
        <ProfileMenu />
        <section className="p-5 w-full">
          <h1 className="text-green-900 font-bold text-2xl">Detalhes da venda:</h1>
          <article className="text-green-900 mt-5">
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
          </article>
        </section>
      </section>
    </>
  )
}

export default ShowSale;
