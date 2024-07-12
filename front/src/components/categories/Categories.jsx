import NewCategory from './NewCategory';
import CategoryListProfile from './CategoryListProfile';
import { useLoaderData } from 'react-router-dom';

function Categories() {
  const data = useLoaderData();
  return (
    <>
      <NewCategory />
      <CategoryListProfile data={data} />
    </>
  );
}

export default Categories;
