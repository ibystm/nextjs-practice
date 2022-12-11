import fetch from 'node-fetch'
import {POST} from "../types/Types"

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getAllPostsData = async () => {
  const res = await fetch(
    new URL(`${BASE_URL}/posts/?_limit=10`)
  )
  const posts = await res.json()
  return posts
}


export const getAllTasksData = async () => {
  const res = await fetch(
    new URL(`${BASE_URL}/todos/?_limit=10`)
  )
  const tasks = await res.json()
  return tasks
}



export const getAllPostIds = async () => {
  const res = await fetch(
    new URL(`${BASE_URL}/todos/?_limit=10`)
  )
  const posts = await res.json()
  return posts.map((p: POST) => {
    return {
      params: {
        id: String(p.id)
      }
    }
  })
}

export const getPostData = async (id: string) => {
  const res = await fetch(
    new URL(`https://jsonplaceholder.typicode.com/posts/${id}`)
  )
  return await res.json()
}