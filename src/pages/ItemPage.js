import axiosInstace from "../http";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Head from "../components/Head";
import ItemShow from "../components/ItemShow";

const ItemPage = () => {
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [qrcode, setQrcode] = useState({});
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { id } = useParams();

  const getProduct = async () => {
    const result = await axiosInstace.get(`/product/${id}`);
    setProduct(result.data);
  }

  const getUser = async () => {
    try {
      const result = await axiosInstace.get(
        `${BASE_URL}/user`,
        { headers: { 'authorization': sessionStorage.getItem('auth') } }
      );
      setUser(result.data);
    } catch (error) {
      alert(error);
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
          name: product.title,
          quantity: product.amount,
          unit_amount: product.amount
        }
      ],
      qr_codes: [
        {
          amount: {
              value: product.amount
          },
          expiration_date: fullDate
        }
      ],
      shipping: {
        address: {
          // street: "Avenida Brigadeiro Faria Lima",
          // number: "1384",
          complement: user.adress.complement,
          locality: user.adress.address,
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
        data,
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
    getProduct();
    getUser();
  }, []);

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white font-bold text-xl">
          { product.title }
        </h1>
      </section>
      <section className="p-10">
        {
          Object.values(product).length > 0 &&
          <ItemShow
            title={ product.title }
            price={ product.price }
            description={ product.description }
            cover={ product.cover }
          />
        }
        {
          qrcode.qrcodes ?
          <img src={ qrcode.qrcodes.links[0].href } /> :
          <button
          type="button"
          className="bg-green-900 p-2 w-24 text-white"
          onClick={ generatePixQrCode }
          >
            Gerar pix
          </button>
        }
      </section>
      <Footer />
    </main>
  );
};

export default ItemPage;