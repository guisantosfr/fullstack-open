import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog Tests', () => {
  let container

  const blog = {
    title: 'Fullstack Open',
    author: 'University of Helsinki',
    likes: 3,
    url: 'fullstackopen.com',
    user: {
      name: 'Developer'
    }
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })


  test('renders only main content', () => {
    const div = container.querySelector('.mainInfo')
    expect(div).toHaveTextContent('Fullstack Open by University of Helsinki')

    const div2 = container.querySelector('.subInfo')
    expect(div2).toHaveStyle('display: none')
  })

  test('renders sub content if button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.subInfo')
    expect(div).not.toHaveStyle('display: none')
  })
})
