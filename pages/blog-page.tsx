import {GetStaticProps} from 'next'
import Layout from '../components/Layout'
import Post from '../components/Post'
import {getAllPostsData} from '../lib/fetch'
import {POST} from '../types/Types'

interface StaticProps {
  posts: POST[]
}

const BlogPage: React.FC<StaticProps> = ({posts}) => {
  return (
    <Layout title="Blog">
      <p className="text-4xl mb-10">blog page</p>
      <ul>
        {posts && posts.map(p => <Post key={p.id}   {...p} />)}
      </ul>
    </Layout>
  )
}
export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData();
  return {
    props: { posts },
  }
}