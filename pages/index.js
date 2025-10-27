import Link from 'next/link'
import MovieCard from '../components/MovieCard'
import prisma from '../lib/prisma'

export default function Home({ movies }) {
  return (
    <div className="bg-black min-h-screen text-white">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ZK PRIME</h1>
        <nav>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <main className="p-6">
        <section className="mb-8">
          <h2 className="text-xl mb-4">Lançamentos</h2>
          <div className="grid grid-cols-5 gap-4">
            {movies.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        </section>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const movies = await prisma.movie.findMany({ take: 10, orderBy: { uploadedAt: 'desc' } })
  return { props: { movies: JSON.parse(JSON.stringify(movies)) } }
}
