import Link from 'next/link'
export default function MovieCard({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-gray-900 rounded overflow-hidden">
        <img src={movie.coverImage || '/placeholder.jpg'} className="w-full h-44 object-cover" />
        <div className="p-2">
          <h3 className="text-sm font-semibold">{movie.title}</h3>
        </div>
      </div>
    </Link>
  )
}
