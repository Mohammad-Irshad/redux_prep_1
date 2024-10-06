import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from "react-redux";
import {fetchBooks} from "./features/booklistSlice"
import BookForm from './components/BookForm';
import BookList from './features/BookList';

function App() {

  const [editingBook, setEditingBook] = useState(null)

  const dispatch = useDispatch()
  const {booklist, status, error} = useSelector((state) => state.booklist)
  
  useEffect(() => {
    dispatch(fetchBooks())
  },[])

  const handleEdit = (book) => {
    setEditingBook(book)
  }
  

  return (
    <main className='container my-5'>      
      
      <section>
        <div className='row'>
          <div className='col-md-6'>
          <h2><i>List of Books</i></h2>
            <hr className='text-danger pb-4'/>
            {
              status !== 'success' ? 
              <div>
                {
                  status === 'loading' && 
                  <div className="text-center text-primary">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                }
                {
                  status === 'error' && 
                  <div>
                    <p className='text-danger py-5'>An Error occured while fetching the books list!</p>
                    <p>{error}</p>
                  </div>
                }
              </div>
              :
              <BookList booklist={booklist} onEdit={handleEdit} />
            }            
          </div>
          <div className='col-md-6'>
            <h2><i>{editingBook ? 'Edit Book' : 'Add a new book'}</i></h2>
            <hr className='text-success'/>
            <BookForm bookToEdit={editingBook} setEditingBook={setEditingBook}/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
