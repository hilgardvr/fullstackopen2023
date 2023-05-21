import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login(username, password)
    console.log('user', user)
    setUser(user)
    setUsername("")
    setPassword("")
  } catch (ex) {
    console.log(ex)
    setErrorMessage('Wrong Credentials')
    setTimeout(() => {
      setErrorMessage(null)
    })
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
          password <input type="text" value={password} name="Username" onChange={({target}) => setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const blogsUI = () => {
  return <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
}

  return (
    <div> { user ? blogsUI() : loginForm() } </div>
  )
}

export default App