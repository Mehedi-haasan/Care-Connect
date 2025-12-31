import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ContentDetails = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const categories = [
  { key: "maternal_health", label: "মাতৃ স্বাস্থ্য" },
  { key: "child_care", label: "শিশু যত্ন" },
  { key: "family_planning", label: "পরিবার পরিকল্পনা" },
  { key: "adolescent_health", label: "কৈশোর স্বাস্থ্য" },
  { key: "mental_health", label: "মানসিক স্বাস্থ্য" },
  { key: "elderly_health", label: "প্রবীণ স্বাস্থ্য" },
  { key: "general_health", label: "সাধারণ স্বাস্থ্য" },
  { key: "women_health", label: "নারী স্বাস্থ্য" },
  { key: "nutrition", label: "খাদ্য ও পুষ্টি" },
  { key: "fitness", label: "ফিটনেস" },
];
  useEffect(() => {
    fetch(`http://localhost:3001/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Content not found");
        return res.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="px-8 py-8 text-center">Loading...</p>;
  if (error) return <p className="px-8 py-8 text-center text-red-500">{error}</p>;


const categoryLabel = categories.find(cat => cat.key === content.categoryKey)?.label;


  
  return (
    <div className="px-4 md:px-16 py-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
       
<div className="text-sm text-gray-500 mb-4">
  {categoryLabel} &gt; {content.subCategoryKey} &gt; {content.title}
</div>
      <h1 className="font-bold text-2xl mb-4">{content.title}</h1>
       <p className="text-gray-700 mb-4">Author: {content.author}</p>

       <img
         src={content.imageUrl}
         alt={content.title}
         className="w-full h-[500px] object-cover rounded-lg mb-6"
       />

       <p className="text-gray-800 leading-relaxed">{content.description}</p>
     </div>
   );
 };

 export default ContentDetails;














































//////////////////////////////////////////////////////////////demo example///////////////////////////////////////////////////////



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ContentDetails = () => {
//   const { id } = useParams();
//   const [content, setContent] = useState(null);

//   const categories = [
//     { key: "maternal_health", label: "মাতৃ স্বাস্থ্য" },
//     { key: "child_care", label: "শিশু যত্ন" },
//     { key: "family_planning", label: "পরিবার পরিকল্পনা" },
//     { key: "adolescent_health", label: "কৈশোর স্বাস্থ্য" },
//     { key: "mental_health", label: "মানসিক স্বাস্থ্য" },
//     { key: "elderly_health", label: "প্রবীণ স্বাস্থ্য" },
//     { key: "general_health", label: "সাধারণ স্বাস্থ্য" },
//     { key: "women_health", label: "নারী স্বাস্থ্য" },
//     { key: "nutrition", label: "খাদ্য ও পুষ্টি" },
//     { key: "fitness", label: "ফিটনেস" },
//   ];
  

//   const allCards = [
//     { id: 1, categoryKey: "maternal_health", subCategoryKey: "মাতৃত্বের প্রস্তুতি", title: "গর্ভাবস্থায় করণীয়", imageUrl: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=400&auto=format&fit=crop" },
//     { id: 2, categoryKey: "maternal_health", subCategoryKey: "গর্ভকালীন শিশুর বিকাশ", title: "শিশুর মনোবিজ্ঞান শিশু বিকাশ", imageUrl: "https://pixabay.com/get/gf4f9470eb0a45b1b8943.jpg" },
//     { id: 3, categoryKey: "maternal_health", subCategoryKey: "প্রয়োজনীয় পুষ্টি", title: "গর্ভকালীন পুষ্টি খাদ্য", imageUrl: "https://pixabay.com/get/gb2f5691da8e21a3bef9b.jpg" },
//     { id: 4, categoryKey: "maternal_health", subCategoryKey: "গর্ভকালীন অসুস্থতা", title: "গর্ভাবস্থায় অসুস্থতা প্রতিরোধ", imageUrl: "https://pixabay.com/get/g8f3f7d6b77789c61f8f0.jpg" },
//     { id: 5, categoryKey: "maternal_health", subCategoryKey: "নিরাপদ ওষুধ ও সাপ্লিমেন্ট", title: "গর্ভকালে নিরাপদ ঔষধ", imageUrl: "https://pixabay.com/get/gc1d4cb6998a1d5f89d2d.jpg" },
//     { id: 6, categoryKey: "maternal_health", subCategoryKey: "প্রসব প্রস্তুতি", title: "প্রসবের প্রস্তুতি ধাপসমূহ", imageUrl: "https://pixabay.com/get/g4a6a71f85f01234caf3f.jpg" },
//     { id: 7, categoryKey: "maternal_health", subCategoryKey: "নবজাতকের যত্ন", title: "নবজাতকের শরীর যত্ন", imageUrl: "https://pixabay.com/get/g8d2342e7f0df12bca9a9.jpg" },
//     { id: 8, categoryKey: "maternal_health", subCategoryKey: "প্রসব পরবর্তী সুস্থতা", title: "প্রসবের পর সুস্থ থাকে", imageUrl: "https://pixabay.com/get/gf4a2c1b2b8f3c9a0a1c8.jpg" },
//     { id: 9, categoryKey: "maternal_health", subCategoryKey: "মাতৃত্বকালীন মানসিক স্বাস্থ্য", title: "মাতৃত্বের মানসিক সুস্থতা", imageUrl: "https://pixabay.com/get/g0c8a0de35a3b4ffc45e4.jpg" },
//     { id: 10, categoryKey: "maternal_health", subCategoryKey: "মাতৃত্ব পরিচয়ে যাত্রা", title: "মাতৃত্ব শুরু করণীয়", imageUrl: "https://pixabay.com/get/gf7809a0b2bbbe58dd0e1.jpg" },
  
//     { id: 11, categoryKey: "child_care", subCategoryKey: "নবজাতক স্বাস্থ্য (০–২ মাস)", title: "নবজাতকের প্রথম যত্ন", imageUrl: "https://pixabay.com/get/gbd4f1f72c91f3d8c71d9.jpg" },
//     { id: 12, categoryKey: "child_care", subCategoryKey: "শিশু স্বাস্থ্য (২–১ বছর)", title: "ছোট শিশুর স্বাস্থ্য টিপস", imageUrl: "https://pixabay.com/get/gc82c062fbd41a4fc2b36.jpg" },
//     { id: 13, categoryKey: "child_care", subCategoryKey: "টডলার স্বাস্থ্য (১–৩ বছর)", title: "টডলারের স্বাস্থ্য রুটিন", imageUrl: "https://pixabay.com/get/gf6478a9eda9c18b7b9e0.jpg" },
//     { id: 14, categoryKey: "child_care", subCategoryKey: "প্রি-স্কুল স্বাস্থ্য (৩–৫ বছর)", title: "প্রি-স্কুল স্বাস্থ্য অনুশীলন", imageUrl: "https://pixabay.com/get/g0cd82a9b6cbbd9e3c4d5.jpg" },
//     { id: 15, categoryKey: "child_care", subCategoryKey: "প্রাইমারি স্কুল বয়সী স্বাস্থ্য", title: "স্কুলবয় শিশু স্বাস্থ্য", imageUrl: "https://pixabay.com/get/g4b742a83f42e5fdf34b8.jpg" },
//     { id: 16, categoryKey: "child_care", subCategoryKey: "শিশুর খাদ্য ও পুষ্টি", title: "শিশুর পুষ্টি পরিকল্পনা", imageUrl: "https://pixabay.com/get/gcbc4f692c9e41c2dfa39.jpg" },
//     { id: 17, categoryKey: "child_care", subCategoryKey: "সাধারণ স্বাস্থ্য বিষয়", title: "বাকি শিশুর সাধারণ স্বাস্থ্য", imageUrl: "https://pixabay.com/get/g2e8b6a3b9d61a3f1430f.jpg" },
//     { id: 18, categoryKey: "child_care", subCategoryKey: "টডলার স্বাস্থ্য (১–৩ বছর)", title: "টডলার ব্যায়াম গাইড", imageUrl: "https://pixabay.com/get/gf118fb3c3b7cef8d9b31.jpg" },
//     { id: 19, categoryKey: "child_care", subCategoryKey: "টডলার স্বাস্থ্য (১–৩ বছর)", title: "টডলার মানসিক খেলা", imageUrl: "https://pixabay.com/get/g5b36f792e19a0b3e4c60.jpg" },
//     { id: 20, categoryKey: "child_care", subCategoryKey: "প্রি-স্কুল স্বাস্থ্য (৩–৫ বছর)", title: "প্রি-স্কুল নিরাপত্তা", imageUrl: "https://pixabay.com/get/g7e9de81b9c8d31f28bd5.jpg" },
  
//     // Maternal Health
//   { id: 21, categoryKey: "maternal_health", subCategoryKey: "গর্ভকালীন অসুস্থতা", title: "গর্ভাবস্থায় সাধারণ অসুস্থতা প্রতিকার", imageUrl: "https://pixabay.com/get/gf7a9c8b3d2e3a1c6a4b5.jpg" },
//   { id: 22, categoryKey: "maternal_health", subCategoryKey: "নিরাপদ ওষুধ ও সাপ্লিমেন্ট", title: "গর্ভকালীন সাপ্লিমেন্ট নির্দেশিকা", imageUrl: "https://pixabay.com/get/gc6f4f2b9a7b3d5e2f7c8.jpg" },
//   { id: 23, categoryKey: "maternal_health", subCategoryKey: "প্রসব প্রস্তুতি", title: "প্রসবের প্রস্তুতি ধাপ", imageUrl: "https://pixabay.com/get/gf8c1b7a2c3e9d4b5f1a2.jpg" },
//   { id: 24, categoryKey: "maternal_health", subCategoryKey: "নবজাতকের যত্ন", title: "নবজাতকের পরিচর্যা নির্দেশিকা", imageUrl: "https://pixabay.com/get/gc2e1f7a5b6d3c8e4f9b1.jpg" },
//   { id: 25, categoryKey: "maternal_health", subCategoryKey: "প্রসব পরবর্তী সুস্থতা", title: "প্রসবের পর সুস্থতার যত্ন", imageUrl: "https://pixabay.com/get/gf1d4c5b7a6e8f3b2c9a1.jpg" },

//   // Child Care
//   { id: 26, categoryKey: "child_care", subCategoryKey: "নবজাতক স্বাস্থ্য (০–২ মাস)", title: "নবজাতকের রোজকার যত্ন", imageUrl: "https://pixabay.com/get/gf5d3c7b2a1e8f6c9d4b2.jpg" },
//   { id: 27, categoryKey: "child_care", subCategoryKey: "শিশু স্বাস্থ্য (২ মাস–১ বছর)", title: "ছোট শিশুর স্বাস্থ্য পরামর্শ", imageUrl: "https://pixabay.com/get/gc7f1a2b3d4e5c6f7a9b8.jpg" },
//   { id: 28, categoryKey: "child_care", subCategoryKey: "টডলার স্বাস্থ্য (১–৩ বছর)", title: "টডলারের দৈনন্দিন স্বাস্থ্য", imageUrl: "https://pixabay.com/get/gf8b1c2d3a4e5f6b7c9d1.jpg" },
//   { id: 29, categoryKey: "child_care", subCategoryKey: "প্রি-স্কুল স্বাস্থ্য (৩–৫ বছর)", title: "প্রি-স্কুল শিশু স্বাস্থ্য নির্দেশিকা", imageUrl: "https://pixabay.com/get/gc2a4b6c7d1e5f3b9a8c4.jpg" },
//   { id: 30, categoryKey: "child_care", subCategoryKey: "প্রাইমারি স্কুল বয়সী স্বাস্থ্য", title: "প্রাইমারি স্কুল শিশু স্বাস্থ্য টিপস", imageUrl: "https://pixabay.com/get/gf1b2c3d4e5f6a7b8c9d1.jpg" },

//   // Mental Health
//   { id: 31, categoryKey: "mental_health", subCategoryKey: "মানসিক স্বাস্থ্য পরিচিতি", title: "মানসিক স্বাস্থ্য ধারণা", imageUrl: "https://pixabay.com/get/gc3a2b1d4e5f6c7a8b9d2.jpg" },
//   { id: 32, categoryKey: "mental_health", subCategoryKey: "মানসিক সমস্যা ও লক্ষণ", title: "সাধারণ মানসিক সমস্যা এবং লক্ষণ", imageUrl: "https://pixabay.com/get/gf2b3c4d5e6f7a8b9c1d2.jpg" },
//   { id: 33, categoryKey: "mental_health", subCategoryKey: "শিশু-কিশোর মানসিক বিকাশ", title: "শিশু ও কিশোরের মানসিক বিকাশ", imageUrl: "https://pixabay.com/get/gc4a5b6c7d8e1f2a3b4c5.jpg" },
//   { id: 34, categoryKey: "mental_health", subCategoryKey: "নারী ও মাতৃত্বকালীন মানসিক স্বাস্থ্য", title: "মাতৃত্বকালীন মানসিক স্বাস্থ্য নির্দেশিকা", imageUrl: "https://pixabay.com/get/gf3a4b5c6d7e8f1a2b3c4.jpg" },
//   { id: 35, categoryKey: "mental_health", subCategoryKey: "প্রবীণদের মানসিক যত্ন", title: "প্রবীণদের মানসিক স্বাস্থ্য টিপস", imageUrl: "https://pixabay.com/get/gc5a6b7c8d9e1f2a3b4c6.jpg" },

//   // Fitness
//   { id: 36, categoryKey: "fitness", subCategoryKey: "দৈনন্দিন ব্যায়াম", title: "প্রতিদিনের ব্যায়াম রুটিন", imageUrl: "https://pixabay.com/get/gf4a5b6c7d8e9f1a2b3c5.jpg" },
//   { id: 37, categoryKey: "fitness", subCategoryKey: "কার্ডিওভাসকুলার ফিটনেস", title: "কার্ডিও ব্যায়ামের গুরুত্ব", imageUrl: "https://pixabay.com/get/gc6a7b8c9d1e2f3a4b5c7.jpg" },
//   { id: 38, categoryKey: "fitness", subCategoryKey: "শক্তি ও পেশি গঠন", title: "শক্তি বৃদ্ধি ও পেশি গঠন", imageUrl: "https://pixabay.com/get/gf5a6b7c8d9e1f2a3b4c6.jpg" },
//   { id: 39, categoryKey: "fitness", subCategoryKey: "ফিটনেস ফর স্পেশাল গ্রুপস", title: "বিশেষ দলের জন্য ফিটনেস", imageUrl: "https://pixabay.com/get/gc7a8b9c1d2e3f4a5b6c8.jpg" },
//   { id: 40, categoryKey: "fitness", subCategoryKey: "মানসিক স্বাস্থ্য ও ফিটনেস", title: "মানসিক সুস্থতার জন্য ব্যায়াম", imageUrl: "https://pixabay.com/get/gf6a7b8c9d1e2f3a4b5c7.jpg" },
//   { id: 41, categoryKey: "maternal_health", subCategoryKey: "মাতৃ পরিচয়ে যাত্রা", title: "মাতৃত্বকালীন যাত্রার নির্দেশিকা", imageUrl: "https://pixabay.com/get/gf7a8b9c1d2e3f4a5b6c9.jpg" },
//   { id: 42, categoryKey: "maternal_health", subCategoryKey: "মাতৃত্বকালীন মানসিক স্বাস্থ্য", title: "মাতৃত্বকালীন মানসিক সুস্থতার টিপস", imageUrl: "https://pixabay.com/get/gc8a9b1c2d3e4f5a6b7c9.jpg" },

//   // Child Care
//   { id: 43, categoryKey: "child_care", subCategoryKey: "সাধারণ স্বাস্থ্য বিষয়", title: "শিশুদের সাধারণ স্বাস্থ্য বিষয়", imageUrl: "https://pixabay.com/get/gf9a1b2c3d4e5f6a7b8c9.jpg" },
//   { id: 44, categoryKey: "child_care", subCategoryKey: "শিশুর খাদ্য ও পুষ্টি", title: "শিশুর সুষম খাদ্য পরিকল্পনা", imageUrl: "https://pixabay.com/get/gc1a2b3c4d5e6f7a8b9c1.jpg" },

//   // Family Planning
//   { id: 45, categoryKey: "family_planning", subCategoryKey: "মৌলিক ধারণা ও গুরুত্ব", title: "পরিবার পরিকল্পনার মৌলিক ধারণা", imageUrl: "https://pixabay.com/get/gf2a3b4c5d6e7f8a9b1c2.jpg" },
//   { id: 46, categoryKey: "family_planning", subCategoryKey: "প্রয়োজনীয়তা ও সুবিধা", title: "পরিবার পরিকল্পনার প্রয়োজনীয়তা", imageUrl: "https://pixabay.com/get/gc3a4b5c6d7e8f9a1b2c3.jpg" },
//   { id: 47, categoryKey: "family_planning", subCategoryKey: "নারীদের পদ্ধতি", title: "নারীদের জন্য নিরাপদ পদ্ধতি", imageUrl: "https://pixabay.com/get/gf4a5b6c7d8e9f1a2b3c4.jpg" },
//   { id: 48, categoryKey: "family_planning", subCategoryKey: "পুরুষদের পদ্ধতি", title: "পুরুষদের জন্য পরিবার পরিকল্পনা", imageUrl: "https://pixabay.com/get/gc5a6b7c8d9e1f2a3b4c5.jpg" },
//   { id: 49, categoryKey: "family_planning", subCategoryKey: "নিরাপত্তা ও পার্শ্বপ্রতিক্রিয়া", title: "পরিবার পরিকল্পনার নিরাপত্তা ও পার্শ্বপ্রতিক্রিয়া", imageUrl: "https://pixabay.com/get/gf6a7b8c9d1e2f3a4b5c6.jpg" },
//   { id: 50, categoryKey: "family_planning", subCategoryKey: "জরুরি পরিবার পরিকল্পনা", title: "জরুরি পরিবার পরিকল্পনার নির্দেশিকা", imageUrl: "https://pixabay.com/get/gc7a8b9c1d2e3f4a5b6c7.jpg" },

//   // Adolescent Health
//   { id: 51, categoryKey: "adolescent_health", subCategoryKey: "বয়ঃসন্ধিকাল", title: "বয়ঃসন্ধিকালের স্বাস্থ্য টিপস", imageUrl: "https://pixabay.com/get/gf8a9b1c2d3e4f5a6b7c8.jpg" },
//   { id: 52, categoryKey: "adolescent_health", subCategoryKey: "ব্যক্তিগত পরিচ্ছন্নতা", title: "ব্যক্তিগত পরিচ্ছন্নতার নিয়মাবলী", imageUrl: "https://pixabay.com/get/gc9a1b2c3d4e5f6a7b8c9.jpg" },
//   { id: 53, categoryKey: "adolescent_health", subCategoryKey: "পুষ্টিকর খাদ্যাভ্যাস", title: "কিশোরদের পুষ্টিকর খাদ্যাভ্যাস", imageUrl: "https://pixabay.com/get/gf1a2b3c4d5e6f7a8b9c1.jpg" },
//   { id: 54, categoryKey: "adolescent_health", subCategoryKey: "দৈহিক ফিটনেস", title: "কিশোরদের জন্য ফিটনেস রুটিন", imageUrl: "https://pixabay.com/get/gc2a3b4c5d6e7f8a9b1c2.jpg" },
//   { id: 55, categoryKey: "adolescent_health", subCategoryKey: "মানসিক সুস্থতা", title: "কিশোরদের মানসিক সুস্থতার পরামর্শ", imageUrl: "https://pixabay.com/get/gf3a4b5c6d7e8f9a1b2c3.jpg" },
//   { id: 56, categoryKey: "adolescent_health", subCategoryKey: "আত্মরক্ষা কৌশল", title: "কিশোরদের আত্মরক্ষা কৌশল", imageUrl: "https://pixabay.com/get/gc4a5b6c7d8e9f1a2b3c4.jpg" },
//   { id: 57, categoryKey: "adolescent_health", subCategoryKey: "নিরাপদ প্রযুক্তি ব্যবহার", title: "নিরাপদ প্রযুক্তি ব্যবহার নির্দেশিকা", imageUrl: "https://pixabay.com/get/gf5a6b7c8d9e1f2a3b4c5.jpg" },
//   { id: 58, categoryKey: "adolescent_health", subCategoryKey: "সুস্থ সম্পর্ক গঠন", title: "কিশোরদের জন্য সুস্থ সম্পর্ক", imageUrl: "https://pixabay.com/get/gc6a7b8c9d1e2f3a4b5c6.jpg" },
//   { id: 59, categoryKey: "adolescent_health", subCategoryKey: "প্রজনন স্বাস্থ্য", title: "কিশোরদের প্রজনন স্বাস্থ্য শিক্ষা", imageUrl: "https://pixabay.com/get/gf6a7b8c9d1e2f3a4b5c7.jpg" },
//   { id: 60, categoryKey: "adolescent_health", subCategoryKey: "শিক্ষা ও ক্যারিয়ার প্রস্তুতি", title: "কিশোরদের শিক্ষা ও ক্যারিয়ার নির্দেশিকা", imageUrl: "https://pixabay.com/get/gc7a8b9c1d2e3f4a5b6c8.jpg" },
//   { id: 61, categoryKey: "mental_health", subCategoryKey: "নারী ও মাতৃত্বকালীন মানসিক স্বাস্থ্য", title: "নারীদের মানসিক স্বাস্থ্য গাইড", imageUrl: "https://pixabay.com/get/gf1a2b3c4d5e6f7a8b9c1.jpg" },
//   { id: 62, categoryKey: "mental_health", subCategoryKey: "প্রবীণদের মানসিক যত্ন", title: "প্রবীণদের মানসিক যত্নের উপায়", imageUrl: "https://pixabay.com/get/gc2a3b4c5d6e7f8a9b1c2.jpg" },
//   { id: 63, categoryKey: "mental_health", subCategoryKey: "কর্মক্ষেত্রে মানসিক স্বাস্থ্য", title: "কর্মক্ষেত্রে মানসিক স্বাস্থ্য রক্ষা", imageUrl: "https://pixabay.com/get/gf3a4b5c6d7e8f9a1b2c3.jpg" },
//   { id: 64, categoryKey: "mental_health", subCategoryKey: "ঝুঁকিপূর্ণ অবস্থা", title: "ঝুঁকিপূর্ণ অবস্থায় মানসিক সমর্থন", imageUrl: "https://pixabay.com/get/gc4a5b6c7d8e9f1a2b3c4.jpg" },
//   { id: 65, categoryKey: "mental_health", subCategoryKey: "ট্রমা ও পুনর্বাসন", title: "ট্রমা ও পুনর্বাসনের নির্দেশিকা", imageUrl: "https://pixabay.com/get/gf5a6b7c8d9e1f2a3b4c5.jpg" },

//   // Elderly Health
//   { id: 66, categoryKey: "elderly_health", subCategoryKey: "প্রতিরোধমূলক স্বাস্থ্যসেবা", title: "প্রবীণদের জন্য প্রতিরোধমূলক স্বাস্থ্য", imageUrl: "https://pixabay.com/get/gc6a7b8c9d1e2f3a4b5c6.jpg" },
//   { id: 67, categoryKey: "elderly_health", subCategoryKey: "প্রবীণদের যত্ন", title: "প্রবীণদের যত্ন নেওয়ার উপায়", imageUrl: "https://pixabay.com/get/gf6a7b8c9d1e2f3a4b5c7.jpg" },
//   { id: 68, categoryKey: "elderly_health", subCategoryKey: "পারিবারিক ও সামাজিক দায়িত্ব", title: "প্রবীণদের সামাজিক দায়িত্ব", imageUrl: "https://pixabay.com/get/gc7a8b9c1d2e3f4a5b6c8.jpg" },
//   { id: 69, categoryKey: "elderly_health", subCategoryKey: "পুনর্বাসন ও সহায়ক সেবা", title: "পুনর্বাসন ও সহায়তা গাইড", imageUrl: "https://pixabay.com/get/gf8a9b1c2d3e4f5a6b7c9.jpg" },
//   { id: 70, categoryKey: "elderly_health", subCategoryKey: "স্বাস্থ্যকর জীবনযাপন", title: "স্বাস্থ্যকর জীবনযাপন টিপস", imageUrl: "https://pixabay.com/get/gc9a1b2c3d4e5f6a7b8c9.jpg" },

//   // Women Health
//   { id: 71, categoryKey: "women_health", subCategoryKey: "খাদ্য ও পুষ্টি", title: "নারীদের জন্য সুষম খাদ্য", imageUrl: "https://pixabay.com/get/gf1a2b3c4d5e6f7a8b9c2.jpg" },
//   { id: 72, categoryKey: "women_health", subCategoryKey: "শারীরিক স্বাস্থ্য", title: "নারীদের শারীরিক স্বাস্থ্য রক্ষা", imageUrl: "https://pixabay.com/get/gc2a3b4c5d6e7f8a9b1c3.jpg" },
//   { id: 73, categoryKey: "women_health", subCategoryKey: "হরমোনাল যত্ন", title: "হরমোনাল যত্নের সহজ পদ্ধতি", imageUrl: "https://pixabay.com/get/gf3a4b5c6d7e8f9a1b2c4.jpg" },
//   { id: 74, categoryKey: "women_health", subCategoryKey: "রোগ প্রতিকার", title: "নারীদের জন্য রোগ প্রতিকার", imageUrl: "https://pixabay.com/get/gc4a5b6c7d8e9f1a2b3c5.jpg" },
//   { id: 75, categoryKey: "women_health", subCategoryKey: "ফিটনেস ও মেডিটেশন", title: "নারীদের ফিটনেস ও মেডিটেশন", imageUrl: "https://pixabay.com/get/gf5a6b7c8d9e1f2a3b4c6.jpg" },

//   // Nutrition
//   { id: 76, categoryKey: "nutrition", subCategoryKey: "শিশু ও কিশোর পুষ্টি", title: "শিশু ও কিশোরদের পুষ্টি গাইড", imageUrl: "https://pixabay.com/get/gc6a7b8c9d1e2f3a4b5c7.jpg" },
//   { id: 77, categoryKey: "nutrition", subCategoryKey: "গর্ভকালীন ও মাতৃ পুষ্টি", title: "গর্ভকালীন ও মাতৃ পুষ্টি নির্দেশিকা", imageUrl: "https://pixabay.com/get/gf6a7b8c9d1e2f3a4b5c8.jpg" },
//   { id: 78, categoryKey: "nutrition", subCategoryKey: "বয়স্কদের পুষ্টি", title: "বয়স্কদের জন্য সুষম পুষ্টি", imageUrl: "https://pixabay.com/get/gc7a8b9c1d2e3f4a5b6c9.jpg" },
//   { id: 79, categoryKey: "nutrition", subCategoryKey: "রোগ নির্দিষ্ট খাদ্যাভ্যাস", title: "রোগ নির্দিষ্ট খাদ্য পরিকল্পনা", imageUrl: "https://pixabay.com/get/gf8a9b1c2d3e4f5a6b7c10.jpg" },
//   { id: 80, categoryKey: "nutrition", subCategoryKey: "ডায়েট ট্রেন্ড ও ভ্রান্ত ধারণা", title: "ডায়েট ট্রেন্ড ও ভুল ধারণা", imageUrl: "https://pixabay.com/get/gc9a1b2c3d4e5f6a7b8c10.jpg" },
//   { id: 81, categoryKey: "fitness", subCategoryKey: "শক্তি ও পেশি গঠন", title: "পেশি গঠনের সহজ কৌশল", imageUrl: "https://pixabay.com/get/gf1a2b3c4d5e6f7a8b9c3.jpg" },
//   { id: 82, categoryKey: "fitness", subCategoryKey: "ফিটনেস ফর স্পেশাল গ্রুপস", title: "বিশেষ দলের জন্য ফিটনেস রুটিন", imageUrl: "https://pixabay.com/get/gc2a3b4c5d6e7f8a9b1c4.jpg" },
//   { id: 83, categoryKey: "fitness", subCategoryKey: "মানসিক স্বাস্থ্য ও ফিটনেস", title: "মানসিক স্বাস্থ্য ও ফিটনেস সমন্বয়", imageUrl: "https://pixabay.com/get/gf3a4b5c6d7e8f9a1b2c5.jpg" },
//   { id: 84, categoryKey: "fitness", subCategoryKey: "ওজন নিয়ন্ত্রণ", title: "ওজন নিয়ন্ত্রণের সহজ কৌশল", imageUrl: "https://pixabay.com/get/gc4a5b6c7d8e9f1a2b3c6.jpg" },
//   { id: 85, categoryKey: "fitness", subCategoryKey: "স্পোর্টস", title: "খেলাধুলা ও ফিটনেস", imageUrl: "https://pixabay.com/get/gf5a6b7c8d9e1f2a3b4c7.jpg" },

//   // Maternal Health
//   { id: 86, categoryKey: "maternal_health", subCategoryKey: "প্রসব প্রস্তুতি", title: "সঠিক প্রসব প্রস্তুতি", imageUrl: "https://pixabay.com/get/gc6a7b8c9d1e2f3a4b5c8.jpg" },
//   { id: 87, categoryKey: "maternal_health", subCategoryKey: "নবজাতকের যত্ন", title: "নবজাতকের সঠিক যত্ন", imageUrl: "https://pixabay.com/get/gf6a7b8c9d1e2f3a4b5c9.jpg" },
//   { id: 88, categoryKey: "maternal_health", subCategoryKey: "প্রসব পরবর্তী সুস্থতা", title: "প্রসব পরবর্তী স্বাস্থ্য রক্ষা", imageUrl: "https://pixabay.com/get/gc7a8b9c1d2e3f4a5b6c10.jpg" },
//   { id: 89, categoryKey: "maternal_health", subCategoryKey: "মাতৃ পরিচয়ে যাত্রা", title: "মাতৃ পরিচয়ে সহায়ক গাইড", imageUrl: "https://pixabay.com/get/gf8a9b1c2d3e4f5a6b7c11.jpg" },
//   { id: 90, categoryKey: "maternal_health", subCategoryKey: "মাতৃত্বকালীন মানসিক স্বাস্থ্য", title: "গর্ভাবস্থায় মানসিক সুস্থতা", imageUrl: "https://pixabay.com/get/gc9a1b2c3d4e5f6a7b8c11.jpg" },

//   // Child Care
//   { id: 91, categoryKey: "child_care", subCategoryKey: "প্রাইমারি স্কুল বয়সী স্বাস্থ্য (৬–১০ বছর)", title: "প্রাইমারি স্কুল শিশুদের স্বাস্থ্য", imageUrl: "https://pixabay.com/get/gf1a2b3c4d5e6f7a8b9c4.jpg" },
//   { id: 92, categoryKey: "child_care", subCategoryKey: "সাধারণ স্বাস্থ্য বিষয়", title: "শিশুদের সাধারণ স্বাস্থ্য পরামর্শ", imageUrl: "https://pixabay.com/get/gc2a3b4c5d6e7f8a9b1c5.jpg" },
//   { id: 93, categoryKey: "child_care", subCategoryKey: "শিশুর খাদ্য ও পুষ্টি", title: "শিশুর খাদ্য ও পুষ্টি নির্দেশিকা", imageUrl: "https://pixabay.com/get/gf3a4b5c6d7e8f9a1b2c6.jpg" },

//   // Family Planning
//   { id: 94, categoryKey: "family_planning", subCategoryKey: "মৌলিক ধারণা ও গুরুত্ব", title: "পরিবার পরিকল্পনার গুরুত্ব", imageUrl: "https://pixabay.com/get/gc4a5b6c7d8e9f1a2b3c7.jpg" },
//   { id: 95, categoryKey: "family_planning", subCategoryKey: "নারীদের পদ্ধতি", title: "নারীদের জন্য পরিবার পরিকল্পনা", imageUrl: "https://pixabay.com/get/gf5a6b7c8d9e1f2a3b4c8.jpg" },
//   { id: 96, categoryKey: "family_planning", subCategoryKey: "পুরুষদের পদ্ধতি", title: "পুরুষদের জন্য পরিবার পরিকল্পনা", imageUrl: "https://pixabay.com/get/gc6a7b8c9d1e2f3a4b5c9.jpg" },
//   { id: 97, categoryKey: "family_planning", subCategoryKey: "জরুরি পরিবার পরিকল্পনা", title: "জরুরি পরিবার পরিকল্পনা নির্দেশিকা", imageUrl: "https://pixabay.com/get/gf6a7b8c9d1e2f3a4b5c10.jpg" },

//   // Nutrition
//   { id: 98, categoryKey: "nutrition", subCategoryKey: "বাংলাদেশি খাবার ও পুষ্টি", title: "বাংলাদেশি খাবারের পুষ্টি মান", imageUrl: "https://pixabay.com/get/gc7a8b9c1d2e3f4a5b6c11.jpg" },
//   { id: 99, categoryKey: "nutrition", subCategoryKey: "ডায়েট ট্রেন্ড ও ভ্রান্ত ধারণা", title: "ডায়েট ট্রেন্ড ও ভুল ধারণা", imageUrl: "https://pixabay.com/get/gf8a9b1c2d3e4f5a6b7c12.jpg" },
//   { id: 100, categoryKey: "fitness", subCategoryKey: "দৈনন্দিন ব্যায়াম", title: "প্রতিদিনের ব্যায়াম পরিকল্পনা", imageUrl: "https://pixabay.com/get/gc9a1b2c3d4e5f6a7b8c12.jpg" },

//   ];

//   useEffect(() => {
//     const selectedContent = allCards.find((card) => card.id === Number(id));
//     setContent(selectedContent);
//   }, [id]);

//   if (!content) return <p className="px-8 py-8 text-center">Content not found</p>;

//   const categoryLabel = categories.find(cat => cat.key === content.categoryKey)?.label;

//   return (
//     <div className="px-4 md:px-16 py-8 max-w-6xl mx-auto">
    
// <div className="text-sm text-gray-500 mb-4">
//   {categoryLabel} &gt; {content.subCategoryKey} &gt; {content.title}
// </div>

//       <h1 className="font-bold text-2xl mb-4">{content.title}</h1>

//       <img
//         src={content.imageUrl}
//         alt={content.title}
//         className="w-full h-[500px] object-cover rounded-lg mb-6"
//       />

//       {/* If you have a description, add it */}
//       {content.description && (
//         <p className="text-gray-800 leading-relaxed">{content.description}</p>
//       )}
//     </div>
//   );
// };

// export default ContentDetails;






