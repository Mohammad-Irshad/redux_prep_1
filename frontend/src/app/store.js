import {configureStore} from '@reduxjs/toolkit'
import {booklistSlice} from '../features/booklistSlice'



export default configureStore({
    reducer : {
        booklist : booklistSlice.reducer
    }
})