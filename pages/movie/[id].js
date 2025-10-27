import prisma from '../../lib/prisma'

export default function MoviePage({ movie }) {
  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="mb-6">
        {movie.videoUrl ? (
          <video controls className="w-full max-h-[70vh] bg-black" src={movie.videoUrl}></video>
        ) : (
          <div className="bg-gray-900 p-6">No video available</div>
        )}
      </div>
      <p>{movie.description}</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const movie = await prisma.movie.findUnique({ where: { id } })
  if (!movie) return { notFound: true }
  return { props: { movie: JSON.parse(JSON.stringify(movie)) } }
}
