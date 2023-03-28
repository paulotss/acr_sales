import { useState } from "react";

const PersonalData = (props) => {
  const [ adressData, setAdressData ] = useState({
    cep: "",
    state: "DF",
    country: "Brasil",
    city: "",
    complement: "",
    adress: "",
    userId: "",
  });

  const adressValidate = () => {
    const {
      cep,
      city,
      adress,
    } = adressData;

    const validation = [
      cep.length === 9,
      city.length > 3,
      adress.length > 3
    ];
    return validation.every((val) => val);
  }

  const handleChangeAdress = ({ target }) => {
    let { value, name } = target;
    switch (name) {
      case "cep":
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    setAdressData({
      ...adressData,
      [name]: value,
    },);
  }

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
      <p className="mb-3">
        <span className="font-bold">Whatsapp: </span>
        { props.whatsapp }
      </p>
      <form>
      <div className="mb-5">
            <label htmlFor="cep" className="text-green-900">CEP</label>
            <input
              type="text"
              name="cep"
              id="cep"
              className="border-2 p-2 w-full"
              onChange={ handleChangeAdress }
              value={ adressData.cep }
              maxLength={ 9 }
              placeholder="99999-999"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="state" className="text-green-900">Estado</label>
            <select
              name="state"
              id="state"
              className="border-2 p-2 w-full"
              onChange={ handleChangeAdress }
              value={ adressData.state }
            >
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="DF">Distrito Federal</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="city" className="text-green-900">Cidade</label>
            <input
              type="text"
              name="city"
              id="city"
              className="border-2 p-2 w-full"
              onChange={ handleChangeAdress }
              value={ adressData.city }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="adress" className="text-green-900">Endereço</label>
            <input
              type="text"
              name="adress"
              id="adress"
              className="border-2 p-2 w-full"
              onChange={ handleChangeAdress }
              value={ adressData.adress }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="complement" className="text-green-900">Complemento</label>
            <input
              type="text"
              name="complement"
              id="complement"
              className="border-2 p-2 w-full"
              onChange={ handleChangeAdress }
              value={ adressData.complement }
            />
          </div>
      </form>
    </section>
  )
};

export default PersonalData;