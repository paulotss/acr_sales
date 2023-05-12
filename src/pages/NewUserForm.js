import { useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import axios from '../http';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';

const NewUserForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpf: "",
      area: "",
      cellPhone: "",
      cep: "",
      state:"AC",
      country: "BRA",
      city: "",
      complement: "",
      number: "",
      street: "",
      locality: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Obrigatório.").max(100),
      lastName: Yup.string().required("Obrigatório.").max(100),
      email: Yup.string().required("Obrigatório.").max(100).email("Formato inválido."),
      password: Yup.string().required("Obrigatório.").max(100).min(6, "Mínimo 6 dígitos."),
      cpf: Yup
        .string()
        .required("Obrigatório.")
        .min(11, "11 números.")
        .matches(/^[0-9]+$/, "Somento números."),
      area: Yup.string().required("DDD obrigatório.")
        .max(2, "Deve conter 2 dígitos.").min(2, "Deve conter 2 dígitos.")
        .matches(/^[0-9]+$/, "Somento números."),
      cellPhone: Yup.string().required("Celular obrigatório.")
        .max(9, "Deve conter 9 dígitos.").min(9, "Deve conter 9 dígitos.")
        .matches(/^[0-9]+$/, "Somento números."),
      cep: Yup.string().required("Obrigatório.")
        .max(8, "Deve conter 8 dígitos.").min(8, "Deve conter 8 dígitos.")
        .matches(/^[0-9]+$/, "Somento números."),
      state: Yup.string().required("Obrigatório.").min(2),
      country: Yup.string(),
      city: Yup.string().required("Obrigatório.").max(45),
      complement: Yup.string().max(100),
      number: Yup.string().required("Obrigatório.")
        .matches(/^[0-9]+$/, "Somento números."),
      street: Yup.string().required("Obrigatório.").max(100),
      locality: Yup.string().required("Obrigatório.").max(100),
    }),
    onSubmit: values => {
      submitForm(values)
    }
  });

  const submitForm = async (values) => {
    try {
      await axios.post(
        "/user/create",
        values
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

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white font-bold text-xl">
          Cadastro
        </h1>
      </section>
      <section className="flex justify-center align-center mt-5">
        <form onSubmit={formik.handleSubmit} className="p-5 border w-[70%]">
          <div className="mb-5">
            <label htmlFor="firstName" className="text-green-900">Nome</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-600">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="text-green-900">Sobrenome</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-600">{formik.errors.lastName}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="text-green-900">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="cpf" className="text-green-900">CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('cpf')}
            />
            {formik.touched.cpf && formik.errors.cpf ? (
              <div className="text-red-600">{formik.errors.cpf}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label className="text-green-900">Celular</label>
            <br/>
            <input
              type="text"
              name="area"
              id="area"
              className="border-2 p-2 w-10 mr-2"
              placeholder="99"
              {...formik.getFieldProps('area')}
            />
            <input
              type="text"
              name="cellPhone"
              id="cellPhone"
              className="border-2 p-2 w-64"
              placeholder="999999999"
              {...formik.getFieldProps('cellPhone')}
            />
            {formik.touched.area && formik.errors.area ? (
              <div className="text-red-600">{formik.errors.area}</div>
            ) : null}
            {formik.touched.cellPhone && formik.errors.cellPhone ? (
              <div className="text-red-600">{formik.errors.cellPhone}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="cep" className="text-green-900">CEP</label>
            <input
              type="text"
              name="cep"
              id="cep"
              className="border-2 p-2 w-full"
              placeholder="99999999"
              {...formik.getFieldProps('cep')}
            />
            {formik.touched.cep && formik.errors.cep ? (
              <div className="text-red-600">{formik.errors.cep}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="state" className="text-green-900">Estado</label>
            <select
              name="state"
              id="state"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('state')}
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
            {formik.touched.state && formik.errors.state ? (
              <div className="text-red-600">{formik.errors.state}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="city" className="text-green-900">Cidade</label>
            <input
              type="text"
              name="city"
              id="city"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('city')}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-600">{formik.errors.city}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="number" className="text-green-900">Número (casa, apt, lote, etc..)</label>
            <input
              type="text"
              name="number"
              id="number"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('number')}
            />
            {formik.touched.number && formik.errors.number ? (
              <div className="text-red-600">{formik.errors.number}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="locality" className="text-green-900">Localidade</label>
            <input
              type="text"
              name="locality"
              id="locality"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('locality')}
            />
            {formik.touched.locality && formik.errors.locality ? (
              <div className="text-red-600">{formik.errors.locality}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="street" className="text-green-900">Bairro/Quadra</label>
            <input
              type="text"
              name="street"
              id="street"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('street')}
            />
            {formik.touched.street && formik.errors.street ? (
              <div className="text-red-600">{formik.errors.street}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="complement" className="text-green-900">Complemento</label>
            <input
              type="text"
              name="complement"
              id="complement"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('complement')}
            />
            {formik.touched.complement && formik.errors.complement ? (
              <div className="text-red-600">{formik.errors.complement}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="text-green-900">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 p-2 w-full"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-green-900 p-2 w-24 text-white disabled:bg-gray-400"
          >
            Cadastrar!
          </button>
        </form>
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