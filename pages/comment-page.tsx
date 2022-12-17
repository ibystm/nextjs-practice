import axios from 'axios'
import useSWR from 'swr'
import Comment from '../components/Comment'
import Layout from '../components/Layout'
import {COMMENT} from '../types/Types'

const axiosFetcher = async () => {
  const result = await axios.get<COMMENT[]>(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10'
  )
  return result.data
}

const CommentPage: React.FC = () => {
  const {data: comments, error} = useSWR('commentsFetch', axiosFetcher)

  if (error) return <span>Error!</span>

  return (
    <Layout title="Comment">
      <p className="text-4xl">comment page</p>
      <ul>
        {comments && comments.map(c => (
          <Comment key={c.id} {...c} />
        ))}
      </ul>
    </Layout>
  )
}

export default CommentPage
