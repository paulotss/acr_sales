import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../http";
import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import loading from "../../media/loading.gif";

const ShowSale = () => {
  const [sale, setSale] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getSaleInfo = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `/sale/product/${id}`
        );
        setSale(result.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    getSaleInfo();
  }, [id]);

  return (
    <>
      <Head />
      <HeadTitle title="Profile" />
      <section className="flex flex-col md:flex-row">
        <ProfileMenu linkActive={4} />
        { !isLoading ? 
        <section className="p-5 w-full">
          <h1 className="text-green-900 text-2xl">Detalhes da venda</h1>
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
            <p>
              <span className="font-bold">Entrega: </span>
              { sale.shipping.address }
            </p>
          </article>
        </section>
        : <div className="flex justify-center w-full">
            <img src={loading} alt="" className="place-self-center self-center" />
          </div>
      }
      </section>
    </>
  )
}

export default ShowSale;
