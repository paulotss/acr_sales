const ItemList = (props) => {
  const { title, price, description } = props;
  return (
    <article className="flex mb-5 flex-row">
      <div className="mr-5 w-1/3 h-64 bg-gray-300"></div>
      <div className="w-2/3">
        <div className="flex justify-between text-green-900">
          <h4 className="text-xl">{ title }</h4>
          <h2 className="font-bold text-2xl">
            { price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
          </h2>
        </div>
        <p className="text-green-900 text-sm">{ description }</p>
      </div>
    </article>
  )
};

export default ItemList;