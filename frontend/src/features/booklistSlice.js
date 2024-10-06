import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const response = await axios.get("http://localhost:3000/books")
    return response.data
})

export const addBook = createAsyncThunk("book/addBook", async (bookData) => {
    const response = await axios.post("http://localhost:3000/books", bookData)
    return(response.data)
})

export const deleteBook = createAsyncThunk("book/deleteBook", async (bookId) => {
    const response = await axios.delete(`http://localhost:3000/books/${bookId}`)
    return response.data
})

export const updateBook = createAsyncThunk("book/updateBook", async ({bookId, updatedData}) => {
    const response = await axios.patch(`http://localhost:3000/book/update/${bookId}`, updatedData)
    return response.data
})

export const booklistSlice = createSlice({
    name : "booklist",
    initialState : {
        booklist : [],
        status : 'idle',
        error : null
    },
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchBooks.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = 'success'
            state.booklist = action.payload
        })
        .addCase(fetchBooks.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        })
        .addCase(addBook.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addBook.fulfilled, (state, action) => {
            state.status = 'success'
            state.booklist.push(action.payload)
        })
        .addCase(addBook.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(deleteBook.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
            state.status = 'success'
            state.booklist = state.booklist.filter((book) => book._id != action.payload.book._id)
        })
        .addCase(deleteBook.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(updateBook.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateBook.fulfilled, (state, action) => {
            state.status = 'success'
            const index = state.booklist.findIndex((book) => book._id === action.payload.book._id)
            if(index > -1){
                state.booklist[index] = action.payload.book
            }
        })
        .addCase(updateBook.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
    }

})


// export const {} = booklistSlice.actions

export default booklistSlice.reducer