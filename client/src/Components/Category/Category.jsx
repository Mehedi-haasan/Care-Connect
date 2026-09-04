import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Advertisement from "../Common/Advertisement";
import Cart from "../Common/Cart";
import BASE_URL from "../URL/baseurl";


const Category = () => {

  const params = useParams();
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState({})
  const [loading, setLoading] = useState(false);



  const FetchContents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/get/content/${params?.id}`);
      const result = await res.json();
      setContent(result?.items)
      setCategory(result?.category)
    } catch (err) {
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    FetchContents()
  }, []);



  return (
    <div className="bg-white min-h-screen px-4 md:px-16 lg:px-32 py-6">
      <h1 className="text-lg font-bold mb-4">
        {category?.name} {'>'} {category?.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t pt-5">
        {content?.map((item) => (
          <Cart key={item.id} item={item} />
        ))}
      </div>

      <Advertisement />
    </div>
  );
};

export default Category;
