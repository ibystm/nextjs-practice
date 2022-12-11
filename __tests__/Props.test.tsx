import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Post from '../components/Post'
import {POST} from '../types/Types'

describe('Post component with given props', () => {
  let dummyProps: POST
  beforeEach(() => {
    dummyProps = {
      usersId: 1,
      id: 1,
      title: 'dummy title1',
      body: 'dummy body1',
    }
  })
  it('should render correctly with given props value', () => {
    render(<Post {...dummyProps} />)
    expect(screen.getByText(dummyProps.id)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.title)).toBeInTheDocument()
  })
})