import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, removeBlog, updateBlogs, user, setMesssage: setMessage}) => {
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
      userId: blog.userId.id,
    }
    const updated = await blogService.put(req)
    updateBlogs(updated)
  }

  const remove = async () => {
    const deleteBlog = window.confirm(`Do you want to delete ${blog.title}`)
    if (deleteBlog) {
      await blogService.remove(blog, user.token)
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
    {blog.title} - {blog.author}
    <button onClick={()=> setDisplayDetails(!displayDetails)}>{displayDetails ? "hide" : "show"}</button>
    <div style={displayDetails ? blogStyle : { display: 'none'}}>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={() => like()}>like</button>
      </div>
      <div>{blog.userId.username}</div>
      {deleteButton()}
    </div>
  </div>)
}

export default Blog