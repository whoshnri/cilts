

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">

            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="bg-black text-white px-4 py-2 rounded-xl hover:bg-black/80 transition">
                Go back Home
            </a>
        </div>
    );
}