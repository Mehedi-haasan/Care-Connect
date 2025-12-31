import { NavLink, useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";

const Banner = () => {
  const navigate  = useNavigate();
  const [data, setData] = useState([
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
    "category": "Fiction",
    "title": "The Silent Forest",
    "author": "John Smith"
  },
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
    "category": "Technology",
    "title": "Mastering JavaScript",
    "author": "Emily Johnson"
  },
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    "category": "History",
    "title": "World War II Chronicles",
    "author": "Michael Brown"
  },
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=800&auto=format&fit=crop",
    "category": "Science",
    "title": "The Universe Explained",
    "author": "Sophia Williams"
  },
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop",
    "category": "Self-Help",
    "title": "The Power of Focus",
    "author": "David Lee"
  }
])



  const fetchCategory = async () => {
    const response = await fetch(`http://localhost:8050/api/get/carousel`);
    const data = await response.json();
    setData(data.items)
  }

  useEffect(() => {
    // fetchCategory();
  }, [])

  var settings = {
    // dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };


  return (
    <div>
      
      <Slider {...settings}>
        
        {
          data?.map((image) => {
            return <div className="relative focus:outline-none bg-white">
              <img className="w-full mx-auto h-[350px] focus:outline-none "
                src={image.imageUrl}
                alt=""
              />
            </div>
          })
        }
      </Slider>
    </div>
  );
};

export default Banner;
