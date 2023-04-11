import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog Tests', () => {
  const blog = {
    title: 'Fullstack Open',
    author: 'University of Helsinki',
    likes: 3,
    url: 'fullstackopen.com',
    user: {
      name: 'Developer'
    }
  }

  test('renders only main content', () => {
    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.mainInfo')
    expect(div).toHaveTextContent('Fullstack Open by University of Helsinki')

    const div2 = container.querySelector('.subInfo')
    expect(div2).toHaveStyle('display: none')
  })
})
