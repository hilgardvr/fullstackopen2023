import { useState } from 'react'

const Blog = ({blog}) => {
  const [displayDetails, setDisplayDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (<div>
    {blog.title}
    <button onClick={()=> setDisplayDetails(!displayDetails)}>{displayDetails ? "hide" : "show"}</button>
    <div style={displayDetails ? blogStyle : { display: 'none'}}>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button>like</button>
      </div>
      <div>{blog.userId.username}</div>
    </div>
  </div>)
}

export default Blog