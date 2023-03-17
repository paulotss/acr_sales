import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";

const NewUserForm = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    whatsapp: "",
  });

  const [ adressData, setAdressData ] = useState({
    cep: "",
    state: "DF",
    country: "Brasil",
    city: "",
    complement: "",
    adress: "",
    userId: "",
  });

  const [ confirmPassword, setConfirmPassword ] = useState("")

  const [ isValid, setIsValid ] = useState(false);

  const userValidate = () => {
    const {
      first_name,
      last_name,
      email,
      password,
      whatsapp,
    } = userData;

    const emailPattern = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/igm
    const validation = [
      first_name.length > 4,
      last_name.length > 4,
      emailPattern.test(email),
      (password.length > 5) && (password === confirmPassword),
      whatsapp.length === 11,
    ];

    return validation.every((val) => val);
  }

  const adressValidate = () => {
    const {
      cep,
      city,
      adress,
    } = adressData;

    const validation = [
      cep.length === 8,
      city.length > 3,
      adress.length > 3
    ];
    return validation.every((val) => val);
  }

  const handleChangeUser = ({ target }) => {
    const { value, name } = target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  const handleChangeAdress = ({ target }) => {
    const { value, name } = target;
    setAdressData({
      ...adressData,
      [name]: value,
    },);
  }

  useEffect(() => {
    if(userValidate() && adressValidate()) {
      setIsValid(true);
    }
  }, [userData, confirmPassword])


  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white font-bold text-xl">
          Cadastro
        </h1>
      </section>
      <section className="flex justify-center align-center mt-5">
        <article className="p-5 border w-[70%]">
          <div className="mb-5">
            <label htmlFor="first_name" className="text-green-900">Nome</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.first_name }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="last_name" className="text-green-900">Sobrenome</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.last_name }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="text-green-900">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.email }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="whatsapp" className="text-green-900">Whatsapp</label>
            <input
              type="number"
              name="whatsapp"
              id="whatsapp"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.whatsapp }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="cep" className="text-green-900">CEP</label>
            <input
              type="number"
              name="cep"
              id="cep"
              className="border-2 p-2 w-full"
              onChange={ handleChangeAdress }
              value={ adressData.cep }
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
          <div className="mb-5">
            <label htmlFor="password" className="text-green-900">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.password }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="confirm_password" className="text-green-900">Confirmação de senha</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              className="border-2 p-2 w-full"
              onChange={ ({ target }) => setConfirmPassword(target.value) }
              value={ confirmPassword }
            />
          </div>
          <button
            type="button"
            disabled={!isValid}
            className="bg-green-900 p-2 w-24 text-white disabled:bg-gray-400"
          >
            Cadastrar!
          </button>
        </article>
      </section>
      <Footer />
    </main>
  );
}

export default NewUserForm;