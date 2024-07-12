function RecipeCardProfile({data}) {
  console.log(data);
    return (
    <>
      <h1>cardprofile</h1>
      <div className='card bg-slate-500 w-96 shadow-xl'>
        <figure>
          {/* <img
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
            alt='Shoes'
          /> */}
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>Name: {data.name}</h2>
            <p>Category: {data.category}</p>
          <div className='flex flex-col justify-end'>
            <button>EDIT</button>
            <button>DELETE</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeCardProfile;
