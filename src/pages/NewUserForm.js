import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import axios from '../http';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewUserForm = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpf: "",
    area: "",
    cellPhone: "",
    cep: "",
    state:"",
    country: "",
    city: "",
    complement: "",
    number: "",
    street: "",
    locality: "",
  });

  const [ confirmPassword, setConfirmPassword ] = useState("")

  const [ isValid, setIsValid ] = useState(false);

  const userValidate = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      cpf,
      area,
      cellPhone,
      cep,
      city,
      number,
      street,
      locality,
    } = userData;

    const emailPattern = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/igm
    const validation = [
      firstName.length > 2,
      lastName.length > 2,
      emailPattern.test(email),
      (password.length > 5) && (password === confirmPassword),
      cpf.length === 11,
      area.length === 2,
      cellPhone.length === 9,
      cep.length === 9,
      city.length > 3,
      Number(number) > 0,
      street.length > 3,
      locality.length > 3
    ];

    return validation.every((val) => val);
  }

  const handleChangeUser = ({ target }) => {
    let { value, name } = target;
    switch (name) {
      case "cpf":
        value = value.replace(/\D/g, "");
      case "area":
        value = value.replace(/\D/g, "");
      case "number":
        value = value.replace(/\D/g, "");
      case "cep":
        value = value.replace(/\D/g, "");
    }
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  const submitForm = async () => {

    try {
      await axios.post(
        "/user/create",
        userData
      );
      navigate("/login");
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("Email já cadastrado!");
      } else {
        toast.error("Houve um problema!");
      }
    }
  }

  useEffect(() => {
    if(userValidate()) {
      setIsValid(true);
    }
  }, [userData, confirmPassword]);


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
            <label htmlFor="firstName" className="text-green-900">Nome</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.firstName }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="text-green-900">Sobrenome</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.lastName }
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
            <label htmlFor="email" className="text-green-900">CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.cpf }
              maxLength={ 11 }
            />
          </div>
          <div className="mb-5">
            <label className="text-green-900">Celular</label>
            <br/>
            <input
              type="text"
              name="area"
              id="area"
              className="border-2 p-2 w-10 mr-2"
              onChange={ handleChangeUser }
              value={ userData.area }
              placeholder="99"
              maxLength={ 2 }
            />
            <input
              type="text"
              name="cellPhone"
              id="cellPhone"
              className="border-2 p-2 w-64"
              onChange={ handleChangeUser }
              value={ userData.cellPhone }
              placeholder="999999999"
              maxLength={ 9 }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="cep" className="text-green-900">CEP</label>
            <input
              type="text"
              name="cep"
              id="cep"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.cep }
              maxLength={ 9 }
              placeholder="99999999"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="state" className="text-green-900">Estado</label>
            <select
              name="state"
              id="state"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.state }
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
              onChange={ handleChangeUser }
              value={ userData.city }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="number" className="text-green-900">Número</label>
            <input
              type="number"
              name="number"
              id="number"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.number }
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
              onChange={ handleChangeUser }
              value={ userData.locality }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="adress" className="text-green-900">Logradouro</label>
            <input
              type="text"
              name="street"
              id="street"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.street }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="complement" className="text-green-900">Complemento</label>
            <input
              type="text"
              name="complement"
              id="complement"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.complement }
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
            onClick={ submitForm }
          >
            Cadastrar!
          </button>
        </article>
      </section>
      <Footer />
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
    </main>
  );
}

export default NewUserForm;