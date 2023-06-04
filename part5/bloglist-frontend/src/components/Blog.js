import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, removeBlog, updateBlogs, user, setMessage }) => {
    const [displayDetails, setDisplayDetails] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const like = async () => {
        const req = {
            ...blog,
            likes: blog.likes + 1,
        }
        updateBlogs(req)
    }

    const remove = async () => {
        const deleteBlog = window.confirm(`Do you want to delete ${blog.title}`)
        if (deleteBlog) {
            removeBlog(blog)
            setMessage(`Deleted blog: ${blog.title}`)
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
    }

    const deleteButton = () => {
        if (user.name === blog.userId.name) {
            return (<div><button onClick={() => remove()}>remove</button></div>)
        } else {
            return (<div></div>)
        }
    }

    return (<div>
        <span>{ blog.title }</span> <span>-</span> <span>{ blog.author }</span>
        <button onClick={() => setDisplayDetails(!displayDetails)} className="hideShowButton">{displayDetails ? 'hide' : 'show'}</button>
        <div style={ displayDetails ? blogStyle : { display: 'none' } }  className="hideableDiv">
            <div>{blog.url}</div>
            <div>
                { blog.likes }
                <button onClick={() => like()} className="likeButton">like</button>
            </div>
            <div>{blog.userId.username}</div>
            {deleteButton()}
        </div>
    </div>)
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    removeBlog: PropTypes.func.isRequired,
    updateBlogs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
}


export default Blog