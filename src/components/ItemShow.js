const ItemShow = (props) => {

  const { title, price, description } = props;

  return (
    <article className="flex">
      <div className="h-96 w-96 bg-gray-300 mr-6"></div>
      <div>
        <p className="mb-3 text-2xl font-bold text-green-900">
          { price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
        </p>
        <p className="mb-3 text-xl font-bold text-green-900">{ title }</p>
        <p className="mb-3 text-green-900">{ description }</p>
        <div className="p-2 bg-gray-300 border-2 border-green-900">
          <p className="text-xl font-bold text-green-900">Name</p>
          <p className="font-bold text-green-900">Telefone: phone</p>
          <p className="font-bold text-green-900">Pix: pix</p>
        </div>
      </div>
    </article>
  )
};

export default ItemShow;