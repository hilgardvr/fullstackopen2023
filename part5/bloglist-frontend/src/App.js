import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({message}) => {
  if (message) {
    return (
      <div className='todo'>
        {message}
      </div>
    )
  } else {
    return null
  }
}

const App = () => {
  const windowUserKey = 'user'
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem(windowUserKey)
    if (!user && userJson) {
      setUser(JSON.parse(userJson))
    } 
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      setUser(user)
      window.localStorage.setItem(windowUserKey, JSON.stringify(user))
      setUsername("")
      setPassword("")
    } catch (ex) {
      setMessage(`Wrong Credentials`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }
  
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem(windowUserKey)
    setUser(null)
  }

  const postBlog = async (event) => {
    event.preventDefault()
    try {
      const resp = await blogService.post({
        title: title,
        author: author,
        url: url,
      }, user.token)
      setBlogs(blogs.concat(resp))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`Posted new blog: ${resp.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (ex) {
      setMessage(`Failed to post blog`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username <input type="text" value={username} name="Username" onChange={({target}) => { setUsername(target.value) }}></input>
          </div>
          <div>
            password <input type="text" value={password} name="Password" onChange={({target}) => setPassword(target.value)}></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const createBlog = () => {
    return (<div>
      <br/>
      <form onSubmit={postBlog}>
        <div>
          title <input type="text" value={title} name="Title" onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          author <input type="text" value={author} name="Author" onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url <input type="text" value={url} name="Url" onChange={({target}) => setUrl(target.value)}/>
        </div>
      <button type="submit">Post</button>
      </form>
    </div>)
  }

  const blogsUI = () => {
    return <div>
      <h3>Logged in as {user.username}</h3>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {createBlog()}
    </div>
  }

  return (
    <div> 
      <Notification message={message} />
      { user ? blogsUI() : loginForm() } 
    </div>
  )
}

export default App