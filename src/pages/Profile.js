import Head from "../components/Head";

const Profile = () => {
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
            <li className="p-2 hover:bg-green-900 hover:text-white cursor-pointer">Meus dados</li>
            <li className="p-2 hover:bg-green-900 hover:text-white cursor-pointer">Pedidos</li>
            <li className="p-2 hover:bg-green-900 hover:text-white cursor-pointer">Anúncios</li>
          </ul>
        </article>
        <article className="p-10">
          <label>
            Nome:
            <input></input>
          </label>
        </article>
      </section>
    </main>
  );
};

export default Profile;