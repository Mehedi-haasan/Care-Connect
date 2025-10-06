import { useParams } from "react-router-dom"


const ContentDetails = () => {
    const params = useParams()

    let data = [
        {
            "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
            "category": "Fiction",
            "title": "The Silent Forest",
            "author": "John Smith"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
            "category": "Technology",
            "title": "Mastering JavaScript",
            "author": "Emily Johnson"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
            "category": "History",
            "title": "World War II Chronicles",
            "author": "Michael Brown"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=800&auto=format&fit=crop",
            "category": "Science",
            "title": "The Universe Explained",
            "author": "Sophia Williams"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop",
            "category": "Self-Help",
            "title": "The Power of Focus",
            "author": "David Lee"
        }
    ]


    return (
        <div className='px-32 py-8'>
            <div className='w-full p-10'>
                <div className='border-b flex justify-between items-center pb-3'>
                    <h1 className='font-bold text-xl'>স্বাস্থ্য সুরক্ষা</h1>
                    <h1 className=''>সমস্ত বিষয় পড়ুন</h1>
                </div>
                <div className=''>
                    <img src={`https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop`} alt="image" className="h-[550px] w-full" />
                    <h1 className="py-4 font-semibold">Author : John Smith</h1>
                    <p>The world of books has always been a source of inspiration, knowledge, and creativity. Each title represents not only the vision of its author but also an entire journey of ideas and imagination. From fiction to science, every category offers a unique way to connect with the reader. Fictional works, for example, allow us to step into new worlds filled with adventure, mystery, and emotional depth. On the other hand, technology and science books bring clarity to complex concepts, making them more accessible for everyone, from beginners to professionals. History books capture the essence of human civilization, documenting the struggles and achievements that shaped our present. Self-help and motivational titles provide guidance for personal growth, helping readers focus, overcome challenges, and achieve their goals.

                        Images play an important role in this experience by making content visually engaging and relatable. A well-chosen cover image can spark curiosity and encourage readers to dive deeper into a story or concept. Combined with carefully crafted titles, categories, and author insights, this collection is designed to be both informative and inspiring. Ultimately, the goal is to create a rich and diverse reading experience that appeals to different interests, passions, and learning styles.</p>
                </div>
            </div>
        </div>
    )
}

export default ContentDetails
