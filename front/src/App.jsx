function App() {
  // const token = window.localStorage.getItem('token');

  return (
    <>
      <div className=" bg-stone-100">
        <div className="mx-auto max-w-screen-md p-4">
          <h1 className="text-3xl font-bold underline mb-10 mt-10 text-center"> 
            Welcome To Our Recipes World!
          </h1>
          <img
            src="https://media.istockphoto.com/id/891322060/photo/pumpkin-soup.jpg?s=612x612&w=0&k=20&c=V-02vtPIazIEGmZaEYKVJg0a2l5rli9tWO3qfcQGAuw="
            alt="Delicious food"
            className="mx-auto mb-10"
          />
          <h3 className="text-1xl font-bold mb-4 text-center">About Us </h3>
          <p className="indent-7">
            We believe that cooking is not just a necessity, but a joyful
            experience that brings people together. Our team is a diverse group
            of culinary enthusiasts, home cooks, and professional chefs who
            share a common passion for food. We are dedicated to providing a
            platform where everyone, regardless of their cooking skill level,
            can find inspiration and guidance.
          </p>
          <ul className="text-1xl font-bold mb-4 mt-10 text-center">
            What Can You Find In Our Website
          </ul>
          <li className="list-disc">
            On our website, you will find a wide selection of various recipes –
            from traditional to modern, from easy to complex.
          </li>
          <li>
            Explore our extensive collection of recipes by selecting your
            preferred country or category!
          </li>
          <li>
            Join our culinary community, share your experiences, and get
            feedback from other members.
          </li>

          <h1 className="text-3xl font-bold mb-10 mt-10 text-center">
            Top rated recipes
          </h1>
        
        </div>
      </div>
    </>
  );
}

export default App;
