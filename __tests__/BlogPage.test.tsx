/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from "@testing-library/react";
import {rest} from "msw";
import {setupServer} from 'msw/node';
import {getPage, initTestHelpers} from "next-page-tester";

const dummyRes = [
  {
    userId: 1,
    id: 1,
    title: 'dummy title1',
    body: 'dummy body1'
  },
  {
    userId: 2,
    id: 2,
    title: 'dummy title2',
    body: 'dummy body2'
  }
]

initTestHelpers()

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(dummyRes)
    )
  })
]

const server = setupServer(...handlers)
beforeAll(() => {
  server.listen() // start server
})
afterEach(() => {
  server.resetHandlers() // it(1つのテストケース)が終わたびにクリーンアップする
  cleanup()
})
afterAll(() => {
  server.close() // ファイルのすべてのテストケースが終了時に実行
})

describe('Blog page', () => {
  it('Should render the list of blogs pre-fetched by getStaticProps', async () => {
    const {page} = await getPage({
      route: '/blog-page'
    })
    render(page)
    expect(await screen.findByText('blog page')).toBeInTheDocument()
    expect(screen.getByText('dummy title1')).toBeInTheDocument()
  })
 })