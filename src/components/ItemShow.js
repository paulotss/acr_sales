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
          `/sales/genpix/${productId}`,
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
    <>
    <article className="flex justify-left">
      <div
        className="shrink-0"
      >
        <div className="flex justify-center bg-gray-300">
          <img
            src={ `https://tebas-bucket.s3.sa-east-1.amazonaws.com/${cover}` }
            className="max-h-md max-w-max"
          />
        </div>
      <div className="max-w-md mt-3">
        <p className="mb-3 text-xl font-bold text-green-900">{ title }</p>
        <p className="mb-3 text-green-900">{ description }</p>
      </div>
      </div>
      
      <div>
        <div className="mb-3 text-2xl font-bold text-white bg-green-600 p-2 rounded-r-full w-80 text-right">
          { price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
        </div>
        <div className="ml-3 p-2 bg-gray-100 border-2 border-gray-300 rounded-lg text-center min-w-96">
          <p className="text-xl font-bold text-green-900">{props.userName}</p>
          <div className="font-bold text-green-900 mt-2">
            { props.userEmail }
          </div>
          {
            Object.keys(pixOrder).length === 0 ?
            <button
              type='button'
              className="bg-green-900 p-2 text-white mt-3 rounded-full disabled:bg-gray-400"
              onClick={ getPix }
              disabled={ isLoading }
            >
              {
                !isLoading ?
                  'Gerar Pix' :
                  <img src={ loadingGif } className="w-5 object-contain text-center" />
              }
            </button> :
            <div className="flex flex-col items-center">
              {
                !statusPix ?
                <>
                  <img
                    src={ pixOrder.qr_codes[0].links[0].href }
                    className="w-64 mt-3"
                  />
                  <button
                    type='button'
                    className="bg-green-900 p-2 mt-3 text-white disabled:bg-gray-400 rounded-full"
                    onClick={ getStatusPix }
                    disabled={ isLoading }
                  >
                    {
                      !isLoading ?
                        'Confirmar pagamento' :
                        <img src={ loadingGif } className="w-5 object-contain text-center" />
                    }
                  </button>
                </> :
                <p className='text-green-900 mt-3 text-center'>
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
    </>
  )
};

export default ItemShow;