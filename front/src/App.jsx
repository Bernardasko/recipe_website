import { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';
import NewCategory from './components/categories/NewCategory';
import RecipeForm from './components/RecipeForm';

function App() {
  const token = window.localStorage.getItem('token')


  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <p className='px-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quae explicabo nostrum unde, dolor repellendus nam. Facere, sequi soluta fugit natus commodi optio incidunt. Laboriosam excepturi quis corporis velit officiis.
      Commodi asperiores voluptatibus atque cumque? Tenetur, inventore. Voluptatem inventore necessitatibus illum commodi minima delectus culpa molestiae quas veritatis hic, animi repellat officia, alias asperiores excepturi quibusdam ratione. Placeat, officiis cupiditate.
      A eveniet doloribus totam, laborum repellendus reiciendis suscipit dolorem eligendi quos. Sapiente architecto, voluptatibus consequuntur doloremque vel, soluta maiores quo est nemo similique provident, quos minus ad. Natus, tempora commodi.
      Non labore dolores possimus corporis recusandae modi! Dolores rerum quas perspiciatis modi eius vel vero sit nam, tempore sunt asperiores libero et itaque, maiores omnis ea. Ipsum earum hic ipsa.
      Aliquam dolore sint animi distinctio, ducimus vel tempore laboriosam! Architecto repudiandae iusto enim illum reprehenderit distinctio sequi est, consequuntur minima sapiente labore soluta dolorum aperiam voluptatibus at nisi impedit doloribus.
      Fuga sed nobis error architecto maiores veniam laborum dolore animi ab eum, mollitia voluptates, vel quo labore maxime excepturi. Nulla provident labore laborum animi vitae. Rerum quisquam repellendus ullam obcaecati!
      Saepe delectus reprehenderit provident distinctio sunt placeat nulla eligendi praesentium, repellat sequi. Accusamus quis unde doloribus ducimus praesentium minima harum deleniti quos culpa repudiandae officia facere, nesciunt dicta modi illum.
      Fuga eos distinctio rem nobis iure nihil tenetur possimus! Veniam tempore animi, porro maxime voluptatibus nostrum laboriosam? Quia ab optio officiis, quisquam excepturi eum. Beatae architecto praesentium repellendus aliquid numquam!
      Sit quis tenetur sint nemo hic possimus id, magnam odit a! Magnam alias perspiciatis adipisci commodi? Quas, corrupti quos voluptatem saepe impedit, dolores laudantium reiciendis officiis eligendi esse blanditiis doloremque.
      Qui repudiandae maiores odio obcaecati delectus voluptatem impedit commodi eaque possimus ipsa facere debitis nihil veritatis culpa repellat ex, fuga placeat mollitia tempore sit dolorum perspiciatis. Delectus esse labore illo.</p>
    </>
  );
}

export default App;
