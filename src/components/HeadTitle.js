const HeadTitle = (props) => {
  return (
    <section className="p-10 bg-green-900">
      <h1 className="text-white font-bold text-xl">
        { props.title }
      </h1>
    </section>
  )
}

export default HeadTitle;