import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, updateBook } from '../features/booklistSlice'

const BookForm = ({ bookToEdit, setEditingBook }) => {

    const [localStatus, setLocalStatus] = useState(null)
    const [bookUpdate, setBookUpdate] = useState(null)
    const [formData, setFormData] = useState({
        bookName: '',
        author: '',
        genre: '',
    })

    const bookNameRef = useRef(null)

    const dispatch = useDispatch()
    const {booklist} = useSelector((state) => state.booklist)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
        setLocalStatus(null)
    }

    useEffect(() => {
        if(bookToEdit){
            setFormData({
                bookName : bookToEdit.bookName,
                author : bookToEdit.author,
                genre : bookToEdit.genre
            })      
            bookNameRef.current.focus()      
        }
    },[bookToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.bookName && formData.author && formData.genre) {
            try{
                if(bookToEdit){
                    setBookUpdate(true)
                    await dispatch(updateBook({ bookId: bookToEdit._id, updatedData: formData })).unwrap()                    
                }else{
                    setBookUpdate(false)
                    await dispatch(addBook(formData)).unwrap()
                }
                // const alreadyExist = booklist.find((book) => book.bookName === formData.bookName)
                // if(alreadyExist){
                //     await dispatch(updateBook({bookId : alreadyExist._id, updatedData : formData})).unwrap()
                // }                
                setLocalStatus('success')
                setFormData({ bookName: '', author: '', genre: '' })
                setEditingBook(null)
            }catch(error){
                console.log(error)
                setLocalStatus('error')
            }
            
        } else {
            alert('Please fill in all fields')
        }
    }

    

  return (
    <div>
        <div className='card'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <label className='form-label' htmlFor='bookName'>Book Name :</label>
                    <input type='text' id='bookName' value={formData.bookName} className='form-control' onChange={handleChange} ref={bookNameRef} />

                    <label className='form-label' htmlFor='name'>Author :</label>
                    <input type='text' id='author' value={formData.author} className='form-control' onChange={handleChange} />

                    <label className='form-label' htmlFor='name'>Genre :</label>
                    <input type='text' id='genre' value={formData.genre} className='form-control' onChange={handleChange} />

                    <div className="d-flex justify-content-between my-4">
                        <button type='submit' className='btn btn-success' >{bookToEdit ? 'Update Book' : 'Add Book'}</button>
                        {
                            localStatus === 'loading' && 
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        {
                            localStatus === 'success' && <p className='text-success'>Book {bookUpdate ? "updated" : "added"} successfully.</p>
                        }
                        {
                            localStatus === 'error' && <p className='text-danger'>Failed to add/update book. Please try again.</p>
                        }                        
                    </div>        
                </form>
            </div>
        </div>
    </div>
  )
}

export default BookForm
