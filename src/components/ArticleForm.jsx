import React, {useState, useEffect} from 'react'
import BackendErrorMessages from './BackendErrorMessages '

const ArticleForm = ({onSubmit, errors, initialValues}) => {
 const [title, setTitle] = useState('')
 const [description, setDescription] = useState('')
 const [body, setBody] = useState('')
 const [tagList, setTagList] = useState('')
 // console.log(title, body, description, tagList)

 const handleSubmit = (e) => {
  e.preventDefault()
  const article = {
   title,
   description,
   body,
   tagList: tagList.split(' '),
  }
  onSubmit(article)
 }

 useEffect(() => {
  if (!initialValues) {
   return
  }
  // console.log('initaial', initialValues)

  setTitle(initialValues.title)
  setDescription(initialValues.description)
  setBody(initialValues.body)
  setTagList(initialValues.tagList)
 }, [initialValues])

 return (
  <div className="editor-page">
   <div className="container-page">
    <div className="row">
     <div className="col-md-10 offset-md-1 col-xs-12">
      {errors && <BackendErrorMessages backendErrors={errors} />}
      <form onSubmit={handleSubmit}>
       <fieldset>
        <fieldset className="form-group">
         <input
          placeholder="title"
          className="form-control form-control-lg"
          type="text"
          name="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
         />
        </fieldset>
        <fieldset className="form-group">
         <input
          placeholder="What is  this article about"
          className="form-control form-control-lg"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
         />
        </fieldset>
        <fieldset className="form-group">
         <textarea
          placeholder="Write ur article (in markdown)"
          className="form-control"
          rows="8"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
         />
        </fieldset>
        <fieldset className="form-group">
         <input
          placeholder="Enter tags"
          className="form-control form-control-lg"
          type="text"
          name="tagList"
          value={tagList}
          onChange={(e) => setTagList(e.target.value)}
         />
        </fieldset>
       </fieldset>
       <fieldset className="form-group">
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
         Opublikuj
        </button>
       </fieldset>
      </form>
     </div>
    </div>
   </div>
  </div>
 )
}

export default ArticleForm
