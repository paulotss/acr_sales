

const PersonalData = (props) => {
  return (
    <section className="text-green-900">
      <p className="mb-3">
        <span className="font-bold">Nome: </span>
        { `${props.firstName} ${props.lastName}` }
      </p>
      <p className="mb-3">
        <span className="font-bold">Email: </span>
        { props.email }
      </p>
      <p className="mb-3">
        <span className="font-bold">Celular: </span>
        { props.cellPhone }
      </p>
    </section>
  )
};

export default PersonalData;