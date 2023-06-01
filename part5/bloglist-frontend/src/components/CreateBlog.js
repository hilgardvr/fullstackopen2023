import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({user, blogs, setBlogs, setMessage}) => {
    const [createBlogVisible, setCreateBlogVisible] = useState(false)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const displayCreate = createBlogVisible ? { } : { display: 'none' }
    const displayButton = createBlogVisible ? { display: 'none' } : { }

    const cancelCreate = async (event) => {
        event.preventDefault()
        setCreateBlogVisible(false)
    }

    const postBlog = async (event) => {
        event.preventDefault()
        try {
            const resp = await blogService.post({
                title: title,
                author: author,
                url: url,
                }, user.token
            )
            setBlogs(blogs.concat(resp))
            setTitle('')
            setAuthor('')
            setUrl('')
            setCreateBlogVisible(false)
            setMessage(`Posted new blog: ${resp.title}`)
        } catch (ex) {
            setMessage(`Failed to post blog`)
        }
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (<div>
      <div style={displayButton}>
        <button onClick={() => setCreateBlogVisible(true)}>New blog</button>
      </div>
      <br/>
      <div style={displayCreate}>
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
        <button onClick={cancelCreate}>Cancel</button>
        </form>
      </div>
    </div>)
}

export default CreateBlog