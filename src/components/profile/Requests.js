import axios from "../../http";

const Requests = (props) => {
  const getProducts = async () => {
    try {
      const result = await axios.get(
        `/user/request/${props.userId}`
      );
      console.log(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Requests</h1>
      <button type="button" onClick={ getProducts } >
        teste
      </button>
    </>
  )
}

export default Requests;