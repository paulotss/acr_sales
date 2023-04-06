import { useContext, useEffect, useState } from "react";
import Head from "../components/Head";
import PersonalData from "../components/profile/PersonalData";
import Adverts from "../components/profile/Adverts";
import NewAdvertForm from "../components/profile/NewAdvertForm";
import { useParams, useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import axios from "../http";
import Address from "../components/profile/Address";
import Requests from "../components/profile/Requests";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const pages = [
    <PersonalData
      firstName={ user.firstName }
      lastName={ user.lastName }
      email={ user.email }
      cellPhone={ user.cellPhone }
      whatsapp={ user.whatsapp }
    />,
    <Address
      data={ user.address }
    />,
    <Adverts />,
    <NewAdvertForm
      userId={ user.id }
    />,
    <Requests
      userId={  user.id }
    />,
  ];

  const { actProfile, setActProfile } = useContext(AppContext);

  useEffect(() => {
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
    setActProfile(Number(id));
    getUser();
  }, []);

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white font-bold text-xl">
          Meu perfil
        </h1>
      </section>
      <section className="flex">
        <article className="p-5 bg-green-100 w-64 h-full">
          <ul className="text-green-900">
            <li
              className={
                `p-2 border-2 hover:border-green-900 cursor-pointer
                ${ actProfile === 0 ? 'bg-green-900 text-white border-green-900' : 'border-green-100'}`
              }
              onClick={ () =>  { setActProfile(0); }}
            >
              Meus dados
            </li>
            <li
              className={
                `p-2 border-2 hover:border-green-900 cursor-pointer
                ${ actProfile === 1 ? 'bg-green-900 text-white border-green-900' : 'border-green-100'}`
              }
              onClick={ () => { setActProfile(1) }}
            >
              Endereço
            </li>
            <li
              className={
                `p-2 border-2 hover:border-green-900 cursor-pointer
                ${ actProfile === 2 || actProfile === 3 ? 'bg-green-900 text-white border-green-900' : 'border-green-100'}`
              }
              onClick={ () => { setActProfile(2) }}
            >
              Anúncios
            </li>
            <li
              className={
                `p-2 border-2 hover:border-green-900 cursor-pointer
                ${ actProfile === 4 ? 'bg-green-900 text-white border-green-900' : 'border-green-100'}`
              }
              onClick={ () => { setActProfile(4) }}
            >
              Pedidos
            </li>
            <li
              className={
                `p-2 border-2 hover:border-green-900 cursor-pointer
                ${ actProfile === 5 ? 'bg-green-900 text-white border-green-900' : 'border-green-100'}`
              }
              onClick={ () => { setActProfile(5) }}
            >
              Vendas
            </li>
          </ul>
        </article>
        <article className="p-10 w-full">
          { pages[actProfile] }
        </article>
      </section>
    </main>
  );
};

export default Profile;