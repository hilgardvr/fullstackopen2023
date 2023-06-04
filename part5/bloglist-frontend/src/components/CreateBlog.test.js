import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'


describe('<Blog />', () => {

    const mockCreateBlogHandler = jest.fn()
    const setMessage = () => {}
    let container = beforeEach(() => {
        container = render(<CreateBlog createBlogHandler={mockCreateBlogHandler} setMessage={setMessage}/>).container
    })

    test('liking sends event to handler', async () => {
        const user = userEvent.setup()
        const newBlogButton = container.querySelector('.showNewBlogForm')
        await user.click(newBlogButton)
        const input = screen.getAllByRole('textbox')
        await user.type(input[0], 'newTitle')
        await user.type(input[1], 'newAuthor')
        await user.type(input[2], 'newUrl')
        const button = screen.getByText('Post')
        await user.click(button)
        expect(mockCreateBlogHandler.mock.calls).toHaveLength(1)
        expect(mockCreateBlogHandler.mock.calls[0][0]).toBe('newTitle')
        expect(mockCreateBlogHandler.mock.calls[0][1]).toBe('newAuthor')
        expect(mockCreateBlogHandler.mock.calls[0][2]).toBe('newUrl')
    })
})