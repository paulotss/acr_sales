const ItemShow = (props) => {

  const { title, price, seller } = props;

  return (
    <article className="flex">
      <div className="h-96 w-96 bg-gray-300 mr-6"></div>
      <div>
        <p className="mb-3 text-2xl font-bold text-green-900">
          { price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
        </p>
        <p className="mb-3 text-xl font-bold text-green-900">{ title }</p>
        <div className="p-2 bg-gray-300 border-2 border-green-900">
          <p className="text-xl font-bold text-green-900">{ seller.name }</p>
          <p className="font-bold text-green-900">Telefone: { seller.phone }</p>
          <p className="font-bold text-green-900">Pix: { seller.pix }</p>
        </div>
      </div>
    </article>
  )
};

export default ItemShow;