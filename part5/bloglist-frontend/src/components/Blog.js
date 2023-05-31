import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, updateBlogs}) => {
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
    </div>
  </div>)
}

export default Blog