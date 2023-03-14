import { useState } from "react";
import Head from "../components/Head";
//import Adverts from "../components/profile/Adverts";
import NewAdvertForm from "../components/profile/NewAdvertForm";
import PersonalData from "../components/profile/PersonalData";
import Requests from "../components/profile/Requests";

const Profile = () => {
  const [page, setPage] = useState(<NewAdvertForm />)
  const [active, setActive] = useState(2);

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
                ${ active === 0 ? 'bg-green-900 text-white border-green-900' : 'border-green-100'}`
              }
              onClick={ () =>  { setPage(<PersonalData />); setActive(0) }}
            >
              Meus dados
            </li>
            <li
              className={
                `p-2 border-2 hover:border-green-900 cursor-pointer
                ${ active === 1 ? 'bg-green-900 text-white border-green-900' : 'border-green-100'}`
              }
              onClick={ () => { setPage(<Requests />); setActive(1) }}
            >
              Pedidos
            </li>
            <li
              className={
                `p-2 border-2 hover:border-green-900 cursor-pointer
                ${ active === 2 ? 'bg-green-900 text-white border-green-900' : 'border-green-100'}`
              }
              onClick={ () => {setPage(<NewAdvertForm />); setActive(2) }}
            >
              Anúncios
            </li>
          </ul>
        </article>
        <article className="p-10 w-full">
          { page }
        </article>
      </section>
    </main>
  );
};

export default Profile;