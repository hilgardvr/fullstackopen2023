import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


describe('<Blog />', () => {

    const mockUpdateBlogsHandler = jest.fn()
    let container = beforeEach(() => {
        const blog = {
            title: 'title',
            author: 'author',
            likes: 1,
            url: 'url',
            userId: {
                username: 'username',
            }
        }
        const removeBlog = () => {}
        const updateBlogs = () => {}
        const user = {}
        const setMessage = () => {}

        container = render(<Blog blog={blog} removeBlog={removeBlog} updateBlogs={mockUpdateBlogsHandler} user={user} setMessage={setMessage}/>).container

    })

    test('renders blog title and author, not url or likes', () => {
        const title = screen.getByText('title')
        expect(title).toBeDefined()
        const author = screen.getByText('author')
        expect(author).toBeDefined()
        const div = container.querySelector('.hideableDiv')
        expect(div).toHaveStyle('display: none')
    })

    test('renders url and likes when clicked', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('.hideShowButton')
        expect(button).toBeDefined
        await user.click(button)
        const title = screen.getByText('title')
        expect(title).toBeDefined()
        const author = screen.getByText('author')
        expect(author).toBeDefined()
        const div = container.querySelector('.hideableDiv')
        expect(div).not.toHaveStyle('display: none')
        const likes = screen.getByText('1')
        expect(likes).toBeDefined()
        const url = screen.getByText('url')
        expect(url).toBeDefined()
    })

    test('liking sends event to handler', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('.likeButton')
        await user.click(button)
        await user.click(button)
        expect(mockUpdateBlogsHandler.mock.calls).toHaveLength(2)
    })
})