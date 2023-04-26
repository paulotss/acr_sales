import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import useGetLoggedUser from '../../hooks/useGetLoggedUser';

const ProfilePersonalData = () => {
  const { user } = useGetLoggedUser();
  return (
    <>
      <Head />
      <HeadTitle title="Meus dados" />
      <section className="flex">
        <ProfileMenu />
        <article className="text-green-900 p-5">
          <p className="mb-3">
            <span className="font-bold">Nome: </span>
            { `${user.firstName} ${user.lastName}` }
          </p>
          <p className="mb-3">
            <span className="font-bold">Email: </span>
            { user.email }
          </p>
          <p className="mb-3">
            <span className="font-bold">Celular: </span>
            ({ user.phones.area }) { user.phones.number }
          </p>
        </article>
      </section>
    </>
  )
}

export default ProfilePersonalData;