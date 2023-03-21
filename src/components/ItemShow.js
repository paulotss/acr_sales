import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockData } from '../mocks/data'
import axios from "../http";

const ItemShow = (props) => {

  const { title, price, description, cover } = props;
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [qrcode, setQrcode] = useState({});

  const getUser = async () => {
    try {
      const result = await axios.get(
        "/user",
        {
          headers: { "authorization": sessionStorage.getItem("auth") }
        }
      );
      setUser(result.data);
    } catch (error) {
      navigate("/login");
    }
  }

  const generatePixQrCode = async () => {
    const date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear() + 1,
    ];

    const fullDate = `${year}-${month}-${day}T00:00:00-00:00`

    const data = {
      reference_id: `ex-${user.id}`,
      customer: {
        name: user.name,
        email: user.email,
        tax_id: "12345678909",
        phones: [
          {
            country: "55",
            area: "11",
            number: user.cellPhone,
            type: "MOBILE"
          }
        ]
      },
      items: [
        {
          name: props.title,
          quantity: props.amount,
          unit_amount: props.amount
        }
      ],
      qr_codes: [
        {
          amount: {
              value: props.amount
          },
          expiration_date: fullDate
        }
      ],
      shipping: {
        address: {
          // street: "Avenida Brigadeiro Faria Lima",
          // number: "1384",
          complement: user.adress.complement,
          locality: user.adress.adress,
          city: user.adress.city,
          region_code: user.adress.state,
          country: "BRA",
          postal_code: user.adress.cep
        }
      }
      // notification_urls: [
      //     "https://meusite.com/notificacoes"
      // ]
    };

    try {
      const result = await axios.post(
        'https://sandbox.api.pagseguro.com/orders',
        mockData,
        {
          headers: {
            "Authorization": "63A51089E29049329DF87FC743DB1522",
            "Content-Type": "application/json"
          }
        }
      );
      setQrcode(result.data);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('auth')) {
      getUser();
    }
  }, []);

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
        {/* <div className="p-2 bg-gray-300 border-2 border-green-900">
          <p className="text-xl font-bold text-green-900">Name</p>
          <p className="font-bold text-green-900">Telefone: phone</p>
        </div> */}
        {
          qrcode.qrcodes ?
          <img src={ qrcode.qrcodes.links[0].href } /> :
          <button
          type="button"
          className="bg-green-900 p-2 w-24 text-white disabled:bg-gray-400"
          onClick={ generatePixQrCode }
          disabled={ !user }
          >
            Gerar pix
          </button>
        }
      </div>
    </article>
  )
};

export default ItemShow;