import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'

const Notification = ({ message }) => {
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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const userJson = window.localStorage.getItem(windowUserKey)
        if (!user && userJson) {
            const parsedUserJson = JSON.parse(userJson)
            setUser(parsedUserJson)
        }
    }, [user])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login(username, password)
            setUser(user)
            window.localStorage.setItem(windowUserKey, JSON.stringify(user))
            setUsername('')
            setPassword('')
        } catch (ex) {
            setMessage('Wrong Credentials')
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

    const loginForm = () => {
        return (
            <div>
                <form onSubmit={handleLogin}>
                    <div>
                      username <input type="text" value={ username } name="Username" onChange={({ target }) => { setUsername(target.value) }}></input>
                    </div>
                    <div>
                      password <input type="text" value={ password } name="Password" onChange={({ target }) => setPassword(target.value)}></input>
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    const updateBlog = async (blog) => {
        const req = {
            ...blog,
            userId: blog.userId.id,
        }
        await blogService.put(req)
        const updatedBlogs = blogs.map(b => {
            if (b.id === blog.id) {
                return {
                    ...b,
                    ...blog
                }
            } else {
                return b
            }
        })
        setBlogs(updatedBlogs)
    }

    const removeBlog = async (blog) => {
        await blogService.remove(blog, user.token)
        const filteredBlogs = blogs.filter(b => {
            return b.id !== blog.id
        })
        setBlogs(filteredBlogs)
    }


    const blogsUI = () => {
        const sortBlogs = (a, b) => a.likes > b.likes
        return <div>
            <h3>Logged in as {user.username}</h3>
            <form onSubmit={handleLogout}>
                <button type="submit">logout</button>
            </form>
            <h2>blogs</h2>
            {blogs.sort(sortBlogs).map(blog =>
                <Blog key={blog.id} blog={blog} removeBlog={removeBlog} updateBlogs={updateBlog} user={user} setMessage={setMessage}/>
            )}
            <CreateBlog user={user} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
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