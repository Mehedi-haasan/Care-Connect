import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Advertisement from "../Common/Advertisement";
import Cart from "../Common/Cart";

const Category = () => {
  const { categorySlug } = useParams(); // dynamic slug from URL

  const [allCards, setAllCards] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // CATEGORY NAME MAP
  const categoryNames = {
    maternal_health: "মাতৃ স্বাস্থ্য",
    child_care: "শিশু যত্ন",
    family_planning: "পরিবার পরিকল্পনা",
    adolescent_health: "কৈশোর স্বাস্থ্য",
    mental_health: "মানসিক স্বাস্থ্য",
    elderly_health: "প্রবীণ স্বাস্থ্য",
    general_health: "সাধারণ স্বাস্থ্য",
    women_health: "নারী স্বাস্থ্য",
    nutrition: "খাদ্য ও পুষ্টি",
    fitness: "ফিটনেস",
  };

  // CATEGORY → SUBCATEGORY MAP
  const categoryMap = {
    maternal_health: [
      "মাতৃত্বের প্রস্তুতি",
      "গর্ভকালীন শিশুর বিকাশ",
      "প্রয়োজনীয় পুষ্টি",
      "গর্ভকালীন অসুস্থতা",
      "নিরাপদ ওষুধ ও সাপ্লিমেন্ট",
      "প্রসব প্রস্তুতি",
      "নবজাতকের যত্ন",
      "প্রসব পরবর্তী সুস্থতা",
      "মাতৃ পরিচয়ে যাত্রা",
      "মাতৃত্বকালীন মানসিক স্বাস্থ্য",
    ],
    child_care: [
      "নবজাতক স্বাস্থ্য (০–২ মাস)",
      "শিশু স্বাস্থ্য (২ মাস–১ বছর)",
      "টডলার স্বাস্থ্য (১–৩ বছর)",
      "প্রি-স্কুল স্বাস্থ্য (৩–৫ বছর)",
      "প্রাইমারি স্কুল বয়সী স্বাস্থ্য (৬–১০ বছর)",
      "সাধারণ স্বাস্থ্য বিষয়",
      "শিশুর খাদ্য ও পুষ্টি",
    ],
    family_planning: [
      "মৌলিক ধারণা ও গুরুত্ব",
      "প্রয়োজনীয়তা ও সুবিধা",
      "নারীদের পদ্ধতি",
      "পুরুষদের পদ্ধতি",
      "নিরাপত্তা ও পার্শ্বপ্রতিক্রিয়া",
      "জরুরি পরিবার পরিকল্পনা",
    ],
    adolescent_health: [
      "বয়ঃসন্ধিকাল",
      "ব্যক্তিগত পরিচ্ছন্নতা",
      "পুষ্টিকর খাদ্যাভ্যাস",
      "দৈহিক ফিটনেস",
      "মানসিক সুস্থতা",
      "আত্মরক্ষা কৌশল",
      "নিরাপদ প্রযুক্তি ব্যবহার",
      "সুস্থ সম্পর্ক গঠন",
      "প্রজনন স্বাস্থ্য",
      "শিক্ষা ও ক্যারিয়ার প্রস্তুতি",
    ],
    mental_health: [
      "মানসিক স্বাস্থ্য পরিচিতি",
      "ডিপ্রেশন",
      "স্ট্রেস",
      "শিশু-কিশোর মানসিক বিকাশ",
      "নারী ও মাতৃত্বকালীন মানসিক স্বাস্থ্য",
    ],
    elderly_health: [
      "শারীরিক স্বাস্থ্য",
      "মানসিক স্বাস্থ্য",
      "প্রয়োজনীয় খাদ্য ও পুষ্টি",
      "প্রতিরোধমূলক স্বাস্থ্যসেবা",
      "প্রবীণদের যত্ন",
    ],
    general_health: [
      "ব্যক্তিগত স্বাস্থ্যবিধি",
      "পারিবারিক স্বাস্থ্যবিধি",
      "পরিবেশ ও পেশাগত স্বাস্থ্য",
      "প্রাথমিক চিকিৎসা",
      "জরুরি স্বাস্থ্যসেবা",
    ],
    women_health: [
      "খাদ্য ও পুষ্টি",
      "শারীরিক স্বাস্থ্য",
      "প্রজনন স্বাস্থ্য",
      "হরমোনাল যত্ন",
      "ফিটনেস ও মেডিটেশন",
    ],
    nutrition: [
      "সুষম খাদ্য",
      "ভিটামিন ও খনিজ",
      "শিশু ও কিশোর পুষ্টি",
      "গর্ভকালীন ও মাতৃ পুষ্টি",
    ],
    fitness: [
      "দৈনন্দিন ব্যায়াম",
      "কার্ডিওভাসকুলার ফিটনেস",
      "শক্তি ও পেশি গঠন",
      "মানসিক স্বাস্থ্য ও ফিটনেস",
    ],
  };

  // 🔥 FETCH DATA BY CATEGORY
  useEffect(() => {
    setActiveCategory(categorySlug);
    setActiveSubCategory("");
    setLoading(true);

    fetch(`http://localhost:8085/articles?category=${categorySlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Data not found");
        return res.json();
      })
      .then((data) => {
        setAllCards(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [categorySlug]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  // FILTER BY SUBCATEGORY
  const filteredCards = allCards.filter(
    (item) =>
      !activeSubCategory || item.subCategoryKey === activeSubCategory
  );

  return (
    <div className="bg-white min-h-screen px-4 md:px-16 lg:px-32 py-6">
      <h1 className="text-2xl font-bold mb-4">
        {categoryNames[activeCategory] || "ক্যাটাগরি"}
      </h1>

      {/* SUBCATEGORY BUTTONS */}
      <div className="flex gap-3 flex-wrap mb-6">
        {categoryMap[activeCategory]?.map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSubCategory(sub)}
            className={`px-3 py-2 rounded transition ${
              activeSubCategory === sub
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-purple-600 hover:text-white"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* CARDS */}
      {filteredCards.length === 0 ? (
        <p className="text-center text-gray-500">কোন তথ্য পাওয়া যায়নি</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((item) => (
            <Cart key={item.id} item={item} />
          ))}
        </div>
      )}

      <Advertisement />
    </div>
  );
};

export default Category;
