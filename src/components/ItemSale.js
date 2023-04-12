import { useContext } from "react";
import AppContext from "../contexts/AppContext";

const ItemSale = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
  const { setActProfile, setSaleData } = useContext(AppContext);

  const handleClick = (data) => {
    setSaleData(data)
    setActProfile(6)
  }

  return (
    <div
      className="flex justify-between p-2 border border-gray-300 cursor-pointer"
      onClick={ () => handleClick(props.saleId) }
    >
      <div className="w-12 h-12">
        <img
          src={`${BASE_URL}/static/${props.data.cover}`}
          className="w-12"
        />
      </div>
      <p className="text-left">{props.data.title}</p>
      <p>DD/MM/AAAA</p>
    </div>
  )
}

export default ItemSale;