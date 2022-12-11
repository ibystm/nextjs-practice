import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {getPage, initTestHelpers} from 'next-page-tester'


initTestHelpers()

describe('Navigation by Lnk', () => {
  it('Should route to selected page in navbar', async () => {
    const { page } = await getPage({
      route: '/index',
    })
    render(page)
    userEvent.click(screen.getByTestId('blog-nav'))
    expect(await screen.findByText('blog page')).toBeInTheDocument()

    userEvent.click(screen.getByTestId('comment-nav'))
    expect(await screen.findByText('comment page')).toBeInTheDocument()

    userEvent.click(screen.getByTestId('home-nav'))
    expect(await screen.findByText('Welcom to Nextjs')).toBeInTheDocument()
  })
})
