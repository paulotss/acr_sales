import { useContext, useEffect, useState } from "react";
import Head from "../components/Head";
import PersonalData from "../components/profile/PersonalData";
import Requests from "../components/profile/Requests";
import Adverts from "../components/profile/Adverts";
import NewAdvertForm from "../components/profile/NewAdvertForm";
import { useParams, useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";

const Profile = () => {
  const { id } = useParams();

  const pages = [
    <PersonalData />,
    <Requests />,
    <Adverts />,
    <NewAdvertForm />
  ];

  const { actProfile, setActProfile } = useContext(AppContext);

  useEffect(() => {
    setActProfile(Number(id))
    console.log(actProfile);
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
              onClick={ () =>  { setActProfile(0); console.log(actProfile); }}
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
              Pedidos
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