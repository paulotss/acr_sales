const ItemProfile = (props) => {
  return (
    <div className="flex justify-between items-center w-full p-5 border">
      <div
        className="h-24 w-24 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('http://localhost:3001/static/${props.cover}')`
        }}
      >
      </div>
      <div className="text-left w-full p-2">{ props.title }</div>
      <div className="w-24 text-center color-red">
        <span className="text-green-900">edit</span> | <span className="text-red-900">del</span>
      </div>
    </div>
  );
}

export default ItemProfile;