import {useState} from 'react'
import NewCategory from './categories/NewCategory'
import CategoryListProfile from './categories/CategoryListProfile';
function Profile() {
    const [refresh, setRefresh] = useState(false);
    return (
    <>
      <h1>profile page</h1>
        <NewCategory refresh={refresh} setRefresh={setRefresh}/>
        <CategoryListProfile refresh={refresh} setRefresh={setRefresh}/>
    </>
  );
}

export default Profile;
