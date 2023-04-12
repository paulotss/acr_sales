import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../http';
import { ToastContainer, toast } from "react-toastify";
import whatsappIcon from '../media/whatsapp.png';
import loadingGif from '../media/rolling.gif';

const ItemShow = (props) => {
  const { productId, title, price, description, cover } = props;
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [pixOrder, setPixOrder] = useState({});
  const [statusPix, setStatusPix] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const result = await axios.get(
        "/user",
        {
          headers: { "authorization": sessionStorage.getItem("auth") }
        }
      );
      return result.data;
    } catch (error) {
      navigate("/login");
    }
  }

  const getPix = async () => {
    const authorization = sessionStorage.getItem('auth');
    if (authorization) {
      setIsLoading(true);
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
      setIsLoading(false);
    } else {
      navigate('/login');
    }
  }

  const getStatusPix = async () => {
    const authorization = sessionStorage.getItem('auth');
    if (authorization) {
      setIsLoading(true);
      try {
        const result = await axios.post(
          `/sales/statuspix`,
          { pixOrderId: pixOrder.id },
          {
            headers: { 'authorization': authorization }
          }
        );
        const { status } = result.data.charges[0];
        if (status && status === "PAID"){
          try {
            const user = await getUser()
            await axios.post(
              '/sales',
              { userId: user.id, productId: productId }
            );
            setStatusPix(true);
            toast.success("Pagamento realizado!")
          } catch (error) {
            toast.error("Houve um erro!");
          }
        } else {
          toast.error("Houve um erro!");
        }
        console.log(status);
      } catch (error) {
        toast.error("Tente novamente!");
        console.log(pixOrder.id);
        console.log(error);
      }
      setIsLoading(false);
    }
  }

  return (
    <article className="flex justify-center">
      <div
        className="shrink-0 h-96 w-96 m-2 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BASE_URL}/static/${cover})`
        }}
      >
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
              className="bg-green-900 p-2 w-24 text-white mt-3 disabled:bg-gray-400"
              onClick={ getPix }
              disabled={ isLoading }
            >
              {
                !isLoading ?
                  'Gerar Pix' :
                  <img src={ loadingGif } className="w-5 ml-8 text-center" />
              }
            </button> :
            <div>
              {
                !statusPix ?
                <>
                  <img
                  src={ pixOrder.qr_codes[0].links[0].href }
                  className="w-64 mt-3"
                  />
                  <button
                    type='button'
                    className="bg-green-900 p-2 w-64 text-white disabled:bg-gray-400"
                    onClick={ getStatusPix }
                    disabled={ isLoading }
                  >
                    {
                      !isLoading ?
                        'Confirmar pagamento' :
                        <img src={ loadingGif } className="w-5 ml-28 text-center" />
                    }
                  </button>
                </> :
                <p className='text-green-900 mt-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline mr-2">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Pagamento confirmado! Obrigado!
                </p>
              }
              
            </div>
          }
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </article>
  )
};

export default ItemShow;