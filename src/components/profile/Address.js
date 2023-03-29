import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../http";

const Address = (props) => {
  const [ addressData, setAddressData ] = useState({
    cep: props.data.cep,
    state: props.data.state,
    country: props.data.country,
    city: props.data.city,
    complement: props.data.complement,
    number: props.data.number,
    street: props.data.street,
    locality: props.data.locality,
    userId: props.data.userId,
  });
  const [isValid, setIsValid] = useState(false);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const adressValidate = () => {
    const {
      cep,
      city,
      number,
      street,
      locality
    } = addressData;

    const validation = [
      cep.length === 9,
      city.length > 3,
      Number(number) > 0,
      street.length > 3,
      locality.length > 3
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
    setAddressData({
      ...addressData,
      [name]: value,
    },);
  }

  const handleSubmit = async () => {
      try {
        if (props.data.cep) {
          await axios.put(
            `${BASE_URL}/address/${addressData.userId}`,
            addressData
          );
        } else {
          await axios.post(
            `${BASE_URL}/address`,
            addressData
          );
        }
        toast.success("Atualizado!");
      } catch (error) {
        toast.error("Houve um problema!");
      }
  }

  useEffect(() => {
    setIsValid(adressValidate());
  }, [addressData]);

  return (
    <form>
      <div className="mb-5">
          <label htmlFor="cep" className="text-green-900">CEP</label>
          <input
            type="text"
            name="cep"
            id="cep"
            className="border-2 p-2 w-full"
            onChange={ handleChangeAdress }
            value={ addressData.cep }
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
            value={ addressData.state }
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
            value={ addressData.city }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="number" className="text-green-900">Número</label>
          <input
            type="number"
            name="number"
            id="number"
            className="border-2 p-2 w-full"
            onChange={ handleChangeAdress }
            value={ addressData.number }
            min="0"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="adress" className="text-green-900">Localidade</label>
          <input
            type="text"
            name="locality"
            id="locality"
            className="border-2 p-2 w-full"
            onChange={ handleChangeAdress }
            value={ addressData.locality }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="adress" className="text-green-900">Logradouro</label>
          <input
            type="text"
            name="street"
            id="street"
            className="border-2 p-2 w-full"
            onChange={ handleChangeAdress }
            value={ addressData.street }
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
            value={ addressData.complement }
          />
        </div>
        <button
          type="button"
          disabled={ !isValid }
          onClick={ handleSubmit }
          className="bg-green-900 p-2 w-24 text-white disabled:bg-gray-400"
        >
          Atualizar
        </button>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </form>
  )
}

export default Address;