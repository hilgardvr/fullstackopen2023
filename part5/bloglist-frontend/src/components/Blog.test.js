import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, not url or likes', () => {
    const blog = {
        blog: {
            title: 'title',
            author: 'author',
            likes: 1,
            url: 'url'
        },
        removeBlog: () => {},
        updateBlogs: () => {},
        user: {},
        setMessage: () => {},
    }

    render(<Blog blog={blog} removeBlog={removeBlog} updateBlogs={updateBlogs} user={user} setMessage={setMessage}/>)

    const title = screen.getByText('title')
    expect(title).toBeDefined()
})