import axios from 'axios'
import { GetStaticProps } from 'next'
import useSWR from 'swr'
import Layout from '../components/Layout'
import { getAllTasksData } from '../lib/fetch'
import { TASK } from '../types/Types'

interface Props {
  staticTasks: TASK[]
}

const axiosFetcher = async () => {
  const res = await axios.get<TASK[]>(
    `https://jsonplaceholder.typicode.com/todos/?_limit=10`
  )
  return res.data
}

const TaskPage: React.FC<Props> = ({ staticTasks }) => {
  const { data: tasks, error } = useSWR('todoFetch', axiosFetcher, {
    fallbackData: staticTasks,
    // pageがmountされた時に、サーバーサイドから最新のデータを取得するための設定(クライアントサイドフェッチ)
    revalidateOnMount: true,
  })

  if (error) return <span>Error!</span>

  return (
    <Layout title="Todos">
      <p className="text-4xl mb-10">todos page</p>
      <ul>
        {tasks &&
          tasks.map((t) => (
            <li key={t.id}>
              {t.id}
              {': '}
              <span>{t.title}</span>
            </li>
          ))}
      </ul>
    </Layout>
  )
}

export default TaskPage

// build時に実行される
export const getStaticProps: GetStaticProps = async () => {
  const staticTasks = await getAllTasksData()
  return {
    props: { staticTasks },
  }
}
