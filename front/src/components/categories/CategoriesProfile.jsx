import NewCategory from './NewCategory';
import CategoryListProfile from './CategoryListProfile';
import { useLoaderData } from 'react-router-dom';

function CategoriesProfile() {
  const data = useLoaderData();
  console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  }

  // Ensure data is an array before attempting to map over it
  if (!Array.isArray(data)) {
    return <div>Error: Data is not an array</div>;
  }

  return (
    <>
      <NewCategory />
      <CategoryListProfile data={data} />
    </>
  );
}

export default CategoriesProfile;
