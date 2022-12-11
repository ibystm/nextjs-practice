import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
}

const Layout: React.FC<Props> = ({ children, title = 'Nextjs' }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a
                  data-testid="home-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-22 rounded"
                >
                  Home
                </a>
              </Link>
              <Link href="/blog-page">
                <a
                  data-testid="blog-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-22 rounded"
                >
                  Blog
                </a>
              </Link>
              <Link href="/comment-page">
                <a
                  data-testid="comment-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-22 rounded"
                >
                  Comment
                </a>
              </Link>
              <Link href="/context-page">
                <a
                  data-testid="context-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-22 rounded"
                >
                  Context
                </a>
              </Link>
              <Link href="/task-page">
                <a
                  data-testid="task-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-22 rounded"
                >
                  Todos
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>
      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a
          className="flex items-center"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powerd by
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="h-4 ml-2"
            height={72}
            width={16}
          />
        </a>
      </footer>
    </div>
  )
}

export default Layout
