const Head = () => {
  return (
    <section class="flex justify-between w-full p-4">
      <div class="flex">
        <div class="w-10 h-10 bg-green-900"></div>
        <h1 class="ml-2 font-bold text-2xl text-green-900">Acrópole</h1>
      </div>

      <div class="flex">
        <button class="mr-2 p-2 font-bold bg-gray-300 text-green-900">Entrar</button>
        <button class="p-2 font-bold bg-green-900 text-white">Anunciar</button>
      </div>
    </section>
  )
};

export default Head;