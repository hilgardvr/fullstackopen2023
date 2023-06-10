import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ createBlogHandler, setMessage }) => {
    const [createBlogVisible, setCreateBlogVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const displayCreate = createBlogVisible ? { } : { display: 'none' }
    const displayButton = createBlogVisible ? { display: 'none' } : { }

    const cancelCreate = async (event) => {
        event.preventDefault()
        setCreateBlogVisible(false)
    }

    const postBlog = async (event) => {
        event.preventDefault()
        try {
            await createBlogHandler(title, author, url)
            setMessage(`Posted new blog: ${title}`)
            setTitle('')
            setAuthor('')
            setUrl('')
            setCreateBlogVisible(false)
        } catch (ex) {
            setMessage('Failed to post blog')
        }
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (<div>
        <div style={displayButton}>
            <button onClick={() => setCreateBlogVisible(true)} className='showNewBlogForm'>New blog</button>
        </div>
        <br/>
        <div style={displayCreate}>
            <form onSubmit={ postBlog }>
                <div>
                    title <input className="title" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
                </div>
                <div>
                    author <input className="author" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
                </div>
                <div>
                    url <input className="url" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
                </div>
                <button className='postNewBlog' type="submit">Post</button>
                <button onClick={cancelCreate}>Cancel</button>
            </form>
        </div>
    </div>)
}

CreateBlog.propTypes = {
    createBlogHandler: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired
}


export default CreateBlog