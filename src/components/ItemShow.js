import { useState } from 'react';
import axios from '../http';
import whatsappIcon from '../media/whatsapp.png';

const ItemShow = (props) => {
  const { title, price, description, cover } = props;
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [pixOrder, setPixOrder] = useState({});
  const [statusPix, setStatusPix] = useState({});

  const getPix = async () => {
    const authorization = sessionStorage.getItem('auth');
    if (authorization) {
      try {
        const result = await axios.get(
          `/sales/genpix/${props.userId}`,
          {
            headers: { 'authorization': authorization }
          }
        );
        setPixOrder(result.data);
        console.log(result.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getStatusPix = async () => {
    const authorization = sessionStorage.getItem('auth');
    if (authorization) {
      try {
        const result = await axios.post(
          `/sales/statuspix`,
          { pixOrderId: pixOrder.id },
          {
            headers: { 'authorization': authorization }
          }
        );
        const { status } = result.data.charges[0];
        console.log(status);
      } catch (error) {
        console.log(pixOrder.id);
        console.log(error);
      }
    }
  }

  return (
    <article className="flex justify-left">
      <div
        className="shrink-0 m-2"
      >
        <img
          src={ `https://tebas-bucket.s3.sa-east-1.amazonaws.com/${cover}` }
          className="max-h-md max-w-md"
        />
      </div>
      <div>
        <p className="mb-3 text-2xl font-bold text-green-900">
          { price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
        </p>
        <p className="mb-3 text-xl font-bold text-green-900">{ title }</p>
        <p className="mb-3 text-green-900">{ description }</p>
        <div className="p-2 bg-gray-300 border-2 border-green-900">
          <p className="text-xl font-bold text-green-900">Pix: 06.196.928/0001-70</p>
          <p className="text-xl font-bold text-green-900">Nome: {props.userName}</p>
          <div className="font-bold text-green-900 mt-2 flex">
            <a
              href={`https://web.whatsapp.com/send?phone=55${props.userWhats}`}
              target="_blank"
              className="w-7 h-7 mr-1"
            >
              <img src={ whatsappIcon } />
            </a>
            <a
              href={`https://web.whatsapp.com/send?phone=55${props.userWhats}`}
              target="_blank"
            >
              (61) { props.userWhats }
            </a>
          </div>
          {
            Object.keys(pixOrder).length === 0 ?
            <button
            type='button'
            className="bg-green-900 p-2 w-24 text-white mt-3"
            onClick={ getPix }
            >
              Gerar pix
            </button> :
            <div>
              <img
                src={ pixOrder.qr_codes[0].links[0].href }
                className="w-64 mt-3"
              />
              <button
                type='button'
                className="bg-green-900 p-2 w-64 text-white"
                onClick={ getStatusPix }
              >
                Confirmar pagamento
              </button>
            </div>
          }
        </div>
      </div>
    </article>
  )
};

export default ItemShow;