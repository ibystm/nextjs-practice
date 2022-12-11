import '@testing-library/jest-dom/extend-expect'
import {cleanup, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {getPage, initTestHelpers} from 'next-page-tester'

initTestHelpers()

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

const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/posts/?_limit=10',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          dummyRes
        ))
    }
  ),
  rest.get(
    'https://jsonplaceholder.typicode.com/posts/1',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          {
            userId: 1,
            id: 1,
            title: 'dummy title1',
            body: 'dummy body1'
          }
        ))
    }
  ),
  rest.get(
    'https://jsonplaceholder.typicode.com/posts/2',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          {
            userId: 2,
            id: 2,
            title: 'dummy title2',
            body: 'dummy body2'
          }
        ))
    }
  )


]

const server = setupServer(...handlers)

beforeAll(() => {
 server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})
describe('Blog detail page', () => {
  it('Should render detaild content of ID 1', async () => {
    const {page} = await getPage({
      route: '/posts/1'
    })
    render(page)
    expect(await screen.findByText('dummy title1')).toBeInTheDocument()
    expect(await screen.findByText('dummy body1')).toBeInTheDocument()
  })
  it('Should render detaild content of ID 2', async () => {
    const {page} = await getPage({
      route: '/posts/2'
    })
    render(page)
    expect(await screen.findByText('dummy title2')).toBeInTheDocument()
    expect(screen.getByText('dummy body2')).toBeInTheDocument() // 上でawaitが完了しているので、await 不要
  })
  it('Should back to blog-page from detail page', async () => {
    const {page} = await getPage({
      route: '/posts/2'
    })
    render(page)
    await screen.findByText('dummy title2')
    userEvent.click(screen.getByTestId('back-blog'))
    expect(await screen.findByText('blog page')).toBeInTheDocument()
  })

})

