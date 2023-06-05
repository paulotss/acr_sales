import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../../components/Head";
import HeadTitle from "../../components/HeadTitle";
import ProfileMenu from "../../components/profile/ProfileMenu";
import { Formik } from "formik";
import axios from "../../http";
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup";
import loading from "../../media/loading.gif";

const EditAdvertForm = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({
    url: null,
    cover: null,
    file: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChangeFile = ({ target }) => {
    const { size, type } = target.files[0];
    if (size > 1000000) {
      toast.error("Tamanho máximo: 1MB.");
      target.value = "";
      setImage({ ...image, url: null });
    } else if (type.split("/")[0] !== "image") {
      toast.error("Somente imagens são permitidas!");
      target.value = "";
      setImage({ ...image, url: null });
    } else {
      setImage({
        ...image,
        url: URL.createObjectURL(target.files[0]),
        cover: target.files[0].name,
        file: target.files[0]
      });
    }
  }

  const submitForm = async (values) => {
    try {
      const auth = sessionStorage.getItem("auth");
      if (auth) {
        await axios.put(`/product/${id}`,
          {
            ...values,
            cover: image.cover,
            file: image.file,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'authorization': auth
            }
          });
        navigate("/profile/adverts");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Houve um problema! :(")
    }
  }

  useEffect(() => {
    const getProductAndCategories = async () => {
      setIsLoading(true);
      const resultProduct = await axios.get(`/product/${id}`);
      setProduct(resultProduct.data);
      const resultCategories = await axios.get("/categories");
      setCategories(resultCategories.data);
      setIsLoading(false);
    }
    getProductAndCategories();
  }, [id])

  return (
    <>
      <Head />
      <HeadTitle title="Profile" />
      <section className="flex flex-col md:flex-row">
        <ProfileMenu linkActive={2} />
          { isLoading
            ? <div className="flex justify-center w-full">
                <img src={loading} alt="" className="place-self-center self-center"/>
              </div>
            : <Formik
              initialValues={{
                title: product.title,
                description: product.description,
                amount: product.amount,
                weight: product.weight || "",
                width: product.width || "",
                height: product.height || "",
                depth: product.depth || "",
                price: product.price,
                categoryId: product.categoryId,
              }}
              validationSchema={Yup.object({
                title: Yup.string().required("Obrigatório").min(3, "Mínimo de 3 caracteres"),
                description: Yup.string().required("Obrigatório").min(3, "Mínimo de 3 caracteres"),
                amount: Yup.string().required("Obrigatório").min(1, "Mínimo 1")
                  .matches(/^[0-9]+$/, "Somento números."),
                width: Yup.string().required("Obrigatório").min(1, "Mínimo 1")
                  .matches(/^[0-9]+$/, "Somento números."),
                height: Yup.string().required("Obrigatório").min(1, "Mínimo 1")
                  .matches(/^[0-9]+$/, "Somento números."),
                weight: Yup.string().required("Obrigatório").min(1, "Mínimo 1")
                  .matches(/^[0-9]+$/, "Somento números."),
                depth: Yup.string().required("Obrigatório").min(1, "Mínimo 1")
                  .matches(/^[0-9]+$/, "Somento números."),
                price: Yup.string().required("Obrigatório")
                  .matches(/^[0-9]*(\.[0-9][0-9])?$/, "Formato moeda. Ex.: 999.99"),
              })}
              onSubmit={(values) => {
                submitForm(values)
              }}
            >
              {formik => (
                <form className="flex flex-col p-5 w-full" onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                      <label className="text-green-900">Título</label><br/>
                      <input
                        className="border-2 p-2 w-full"
                        type="text"
                        name="title"
                        id="title"
                        {...formik.getFieldProps('title')}
                      />
                      {formik.touched.title && formik.errors.title ? (
                      <div className="text-red-600 text-sm">{formik.errors.title}</div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label className="text-green-900">Descrição</label><br/>
                    <textarea
                      className="border-2 p-2 w-full h-24"
                      name="description"
                      id="description"
                      {...formik.getFieldProps('description')}
                    >
                    </textarea>
                    {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-600 text-sm">{formik.errors.description}</div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label className="text-green-900">Imagens</label><br/>
                    <input
                      type="file"
                      name="cover"
                      onChange={handleChangeFile}
                      accept="image/png, image/jpeg"
                    />
                    {
                      image.url || product.cover ?
                      <img
                        src={ image.url || `https://tebas-bucket.s3.sa-east-1.amazonaws.com/${product.cover}` }
                        alt=""
                        className="w-80 border-2 border-green-900 mt-2"
                      /> :
                      ""
                    }
                  </div>

                  <div className="mb-3">
                    <label className="text-green-900">Categoria</label><br/>
                    <select
                      name="categoryId"
                      id="categoryId"
                      className="border-2 p-2 w-32"
                      {...formik.getFieldProps('categoryId')}
                    >
                      {
                        categories.map((category) => (
                          <option key={ category.id } value={ category.id }>
                            { category.title }
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="text-green-900">Quantidade</label><br/>
                    <input
                      type="text"
                      className="border-2 p-2 w-24"
                      name="amount"
                      id="amount"
                      min="0"
                      {...formik.getFieldProps('amount')}
                    />
                    {formik.touched.amount && formik.errors.amount ? (
                    <div className="text-red-600 text-sm">{formik.errors.amount}</div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label className="text-green-900">Peso</label><br/>
                    <input
                      type="text"
                      className="border-2 p-2 w-24"
                      placeholder="kg"
                      name="weight"
                      id="weight"
                      {...formik.getFieldProps('weight')}
                    />
                    {formik.touched.weight && formik.errors.weight ? (
                    <div className="text-red-600 text-sm">{formik.errors.weight}</div>
                    ) : null}
                  </div>

                  <div className="flex">
                    <div className="mb-3 mr-2">
                      <label className="text-green-900">Largura</label><br/>
                      <input
                        type="text"
                        className="border-2 p-2 w-24"
                        placeholder="cm"
                        name="width"
                        id="width"
                        {...formik.getFieldProps('width')}
                      />
                      {formik.touched.width && formik.errors.width ? (
                      <div className="text-red-600 text-sm">{formik.errors.width}</div>
                      ) : null}
                    </div>

                    <div className="mb-3 mr-2">
                      <label className="text-green-900">Altura</label><br/>
                      <input
                        type="text"
                        className="border-2 p-2 w-24"
                        placeholder="cm"
                        name="height"
                        id="height"
                        {...formik.getFieldProps('height')}
                      />
                      {formik.touched.height && formik.errors.height ? (
                      <div className="text-red-600 text-sm">{formik.errors.height}</div>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <label className="text-green-900">Profundidade</label><br/>
                      <input
                        type="text"
                        className="border-2 p-2 w-24"
                        placeholder="cm"
                        name="depth"
                        id="depth"
                        {...formik.getFieldProps('depth')}
                      />
                      {formik.touched.depth && formik.errors.depth ? (
                      <div className="text-red-600 text-sm">{formik.errors.depth}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="text-green-900">Preço</label><br/>
                    <input
                      type="text"
                      className="border-2 p-2 w-32"
                      placeholder="R$"
                      name="price"
                      id="price"
                      {...formik.getFieldProps('price')}
                    />
                    {formik.touched.price && formik.errors.price ? (
                    <div className="text-red-600 text-sm">{formik.errors.price}</div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="bg-green-900 p-2 w-24 text-white disabled:bg-gray-400"
                  >
                    Enviar
                  </button>
                </form>
              )}
            </Formik>
          }
      </section>
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
    </>
  )
}

export default EditAdvertForm;