import axios from '../../http';
import { useEffect, useState, useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewAdvertForm = (props) => {
  const { setActProfile } = useContext(AppContext);

  const [advert, setAdvert] = useState({
    title: "",
    description: "",
    cover: "teste",
    amount: "",
    width: "",
    height: "",
    weight: "",
    depth: "",
    price: "",
    file:"",
    categoryId: 1,
    userId: props.userId,
  });
  const [image, setImage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [categories, setCategories] = useState([]);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const getCategories = async () => {
    const result = await axios.get(
      `${BASE_URL}/categories`
    );
    setCategories(result.data);
  }

  const validateAvertForm = () => {
    const result = [
      advert.title !== "",
      advert.description !== "",
      advert.cover !== "",
      Number(advert.price) > 0,
      advert.file !== "",
    ];
    return result.every((val) => val);
  }

  const handleChange = ({ target }) => {
    let { name, value } = target;
    if (name === "price") {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d)(\d{2})$/, "$1.$2")
    }
    setAdvert({
      ...advert,
      [name]: value
    });
  }

  const handleChangeFile = ({ target }) => {
    const { size, type } = target.files[0];
    if (size > 100000) {
      toast.error("Tamanho máximo: 1MB.");
      target.value = "";
      setImage("");
    } else if (type.split("/")[0] !== "image") {
      toast.error("Somente imagens são permitidas!");
      target.value = "";
      setImage("");
    } else {
      setImage(URL.createObjectURL(target.files[0]));
      setAdvert({
        ...advert,
        cover: target.files[0].name,
        file: target.files[0]
      });
    }
  }

  const submitForm = async () => {
    try {
      const result = await axios.post('/product', advert, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setActProfile(2);
    } catch (error) {
      toast.error("Houve um problema! :(")
    }
  }

  useEffect(() => {
    setIsValid(validateAvertForm());
  }, [advert]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h1 className="mb-3 font-bold text-2xl text-green-900">Novo anúncio</h1>
      <form className="flex flex-col">
        <div className="mb-3">
          <label className="text-green-900">Título</label><br/>
          <input
            className="border-2 p-2 w-full"
            type="text"
            name="title"
            value={advert.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="text-green-900">Descrição</label><br/>
          <textarea
            className="border-2 p-2 w-full h-24"
            name="description"
            value={advert.description}
            onChange={handleChange}
          >
          </textarea>
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
            image ?
            <img
            src={ image }
            className="w-80 border-2 border-green-900 mt-2"
            /> :
            ""
          }
        </div>

        <div className="mb-3">
          <label className="text-green-900">Categoria</label><br/>
          <select
            name="categoryId"
            className="border-2 p-2 w-32"
            value={ advert.categoryId }
            onChange={ handleChange }
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
            type="number"
            className="border-2 p-2 w-24"
            name="amount"
            value={advert.amount}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="text-green-900">Peso</label><br/>
          <input
            type="number"
            className="border-2 p-2 w-24"
            placeholder="kg"
            name="weight"
            value={advert.weight}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="flex">
          <div className="mb-3 mr-2">
            <label className="text-green-900">Largura</label><br/>
            <input
              type="number"
              className="border-2 p-2 w-24"
              placeholder="cm"
              name="width"
              value={advert.width}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="mb-3 mr-2">
            <label className="text-green-900">Altura</label><br/>
            <input
              type="number"
              className="border-2 p-2 w-24"
              placeholder="cm"
              name="height"
              value={advert.height}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="mb-3">
            <label className="text-green-900">Profundidade</label><br/>
            <input
              type="number"
              className="border-2 p-2 w-24"
              placeholder="cm"
              name="depth"
              value={advert.depth}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-green-900">Preço</label><br/>
          <input
            type="text"
            className="border-2 p-2 w-32"
            placeholder="R$"
            name="price"
            value={advert.price}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="bg-green-900 p-2 w-24 text-white disabled:bg-gray-400"
          onClick={ submitForm }
          disabled={ !isValid }
        >
          Criar
        </button>
      </form>
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
    </div>
    
  )
}

export default NewAdvertForm;