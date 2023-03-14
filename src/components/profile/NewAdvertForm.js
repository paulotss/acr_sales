import axios from "axios";
import { useState } from "react";

const NewAdvertForm = () => {
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
    categoryId: 1
  });

  const [image, setImage] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setAdvert({
      ...advert,
      [name]: value
    });
  }

  const handleChangeFile = async ({ target }) => {
    setImage(URL.createObjectURL(target.files[0]));
    setAdvert({
      ...advert,
      cover: target.files[0].name,
      file: target.files[0]
    });
  }

  const submitForm = async () => {
    const result = await axios.post('http://localhost:3001/product', advert, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (result.status === 201) console.log("ok!");
  }

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
          />
          <img src={image} />
        </div>

        <div className="mb-3">
          <label className="text-green-900">Quantidade</label><br/>
          <input
            type="number"
            className="border-2 p-2 w-24"
            name="amount"
            value={advert.amount}
            onChange={handleChange}
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
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-green-900">Preço</label><br/>
          <input
            type="number"
            className="border-2 p-2 w-24"
            placeholder="R$"
            name="price"
            value={advert.price}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="bg-green-900 p-2 w-24 text-white"
          onClick={ submitForm }
        >
          Criar
        </button>
      </form>
    </div>
    
  )
}

export default NewAdvertForm;