import { deleteCategoryById } from "../../services/delete.mjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


function CategoryListProfile({ data }) {
  const [refresh, setRefresh] = useState([]);

  const navigate = useNavigate();
  const deleteCat = async (categoryid) => {
    console.log(data.name);

    try {
      const response = await deleteCategoryById(categoryid);
      if (response.status === 200) toast.success(`Category was deleted !`);
      navigate("/profile/categories");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Category list</h1>
      <ul>
        {data.map((item, index) => {
          return (
            <li key={index}>
              <div>
                <p className="bg-lime-600 py-2 max-w-max mx-auto">
                  {item.name}
                </p>
                <button
                  className="border bg-slate-500 p-2 rounded-lg"
                  onClick={() => deleteCat(item.categoryid)}
                >
                  delete {item.name} category
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <Toaster />
    </>
  );
}

export default CategoryListProfile;
