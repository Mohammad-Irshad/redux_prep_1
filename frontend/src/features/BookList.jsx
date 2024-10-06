import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook } from './booklistSlice'

const BookList = ({ booklist, onEdit }) => {

    const dispatch = useDispatch()

    const deleteHandler = (bookId) => {
        dispatch(deleteBook(bookId))
    }    

  return (
    <div>      
        {booklist.length > 0 ?
            <ul className="list-group ">
                {booklist.map((book) => (
                    <li key={book._id} className='list-group-item'>
                        <div className='row align-items-center'>
                            <div className='col-md-10'>
                                <h4>{book.bookName}</h4>
                                <div className='row'>
                                    <div className='col-md-6'> <p>Author : {book.author}</p> </div>
                                    <div className='col-md-6'> <p className=''>Genre : {book.genre}</p> </div>   
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <button className='btn btn-sm btn-danger' onClick={() => deleteHandler(book._id)}>Delete</button>
                                <br/>
                                <button className='btn btn-sm btn-info mt-2 px-3 text-white' onClick={() => onEdit(book)}>Edit</button>                                
                            </div>
                        </div>                                         
                        
                    </li>
                ))}
            </ul>            
            : 
            <p>Booklist is empty!</p>
        }      
    </div>
  )
}

export default BookList
