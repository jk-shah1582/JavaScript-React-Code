import { useEffect, useState } from "react";

export default function FetchAPI() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setPosts(data.slice(0, 5)); // Get first 5 posts
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Title Of First Five Post</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li 
                        key={post.id}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}