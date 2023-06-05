import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import useGetLoggedUser from '../../hooks/useGetLoggedUser';
import loading from "../../media/loading.gif";

const ProfilePersonalData = () => {
  const { user, isLoading } = useGetLoggedUser();
  return (
    <>
      <Head />
      <HeadTitle title="Meus dados" />
      <section className="flex flex-col md:flex-row">
        <ProfileMenu linkActive={1} />
        { !isLoading
          ? <section className="flex flex-col md:flex-row">
            <article className="text-green-900 p-5">
              <h2
                className="text-green-900 text-2xl mb-3"
              >
                Dados Pessoais
              </h2>
              <p className="mb-3">
                <span className="font-bold">Nome</span><br/>
                { `${user.firstName} ${user.lastName}` }
              </p>
              <p className="mb-3">
                <span className="font-bold">Email</span>
                <br/>
                { user.email }
              </p>
              <p className="mb-3">
                <span className="font-bold">Celular</span>
                <br/>
                ({ user.phones.area }) { user.phones.number }
              </p>
            </article>
            <article className="text-green-900 p-5">
            <h2
                className="text-green-900 text-2xl mb-3"
              >
                Endereço
              </h2>
              <p className="mb-3">
                <span className="font-bold">Cidade</span>
                <br/>
                { user.address.city }
              </p>
              <p className="mb-3">
                <span className="font-bold">Estado</span>
                <br/>
                { user.address.state }
              </p>
              <p className="mb-3">
                <span className="font-bold">Localidade</span>
                <br/>
                { user.address.street }
              </p>
              <p className="mb-3">
                <span className="font-bold">Bairro</span>
                <br/>
                { user.address.locality }
              </p>
              <p className="mb-3">
                <span className="font-bold">Número</span>
                <br/>
                { user.address.number }
              </p>
              <p className="mb-3">
                <span className="font-bold">CEP</span>
                <br/>
                { user.address.cep }
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

export default ProfilePersonalData;