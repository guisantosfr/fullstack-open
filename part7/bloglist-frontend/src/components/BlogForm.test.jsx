import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Create a new blog', async () => {
  const newBlog = {
    title: 'Fullstack Open',
    author: 'University of Helsinki',
    likes: 3,
    url: 'fullstackopen.com',
    user: {
      name: 'Developer'
    }
  }

  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm handleCreateBlog={createBlog} />)

  const inputTitle = container.querySelectorAll('input')[0]
  const inputAuthor = container.querySelectorAll('input')[1]
  const inputUrl = container.querySelectorAll('input')[2]
  const sendButton = container.querySelector('button')

  await user.type(inputTitle, newBlog.title)
  await user.type(inputAuthor, newBlog.author)
  await user.type(inputUrl, newBlog.url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe('Fullstack Open')
})