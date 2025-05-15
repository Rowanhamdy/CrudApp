import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null ,record:null};

// fetch posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_ , thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await fetch("http://localhost:3006/posts");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// fetch posts
export const getPost = createAsyncThunk(
    "posts/getPost",
    async (id , thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
  
      try {
        const response = await fetch(`http://localhost:3006/posts/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


// insert posts
export const insertPosts = createAsyncThunk(
    "posts/insertPosts",
    async (item , thunkAPI) => {
      const { rejectWithValue ,getState } = thunkAPI;
      const {auth} = getState();
      item.userId = auth.id;
      item.id = Math.floor(Math.random()*600)
  
      try {
        const response = await fetch(`http://localhost:3006/posts`,{
            method:'POST',
            body:JSON.stringify(item),
            headers:{"Content-Type": "application/json; charset=UTF-8",}
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

//edit posts
export const editPosts = createAsyncThunk(
    "posts/editPosts",
    async (item, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetch(`http://localhost:3006/posts/${item.id}`, {
          method: "PATCH",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

//Delete posts
export const deletePosts = createAsyncThunk(
    "posts/deletePosts",
    async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        
         await fetch(`http://localhost:3006/posts/${id}`, {
          method: "DELETE",
        });
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord:(state) =>{
        state.record = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
        console.log(state);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      // get post
      builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      //insert
      builder
      .addCase(insertPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload)
      })
      .addCase(insertPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
       //edit
       builder
       .addCase(editPosts.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(editPosts.fulfilled, (state, action) => {
         state.loading = false;
         state.record=action.payload
       })
       .addCase(editPosts.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
       });
       //Delete
       builder
       .addCase(deletePosts.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(deletePosts.fulfilled, (state, action) => {
               state.loading = false;
               state.records = state.records.filter(
                 (record) => record.id !== action.payload
               );
             })
       .addCase(deletePosts.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
       });
  },
});

export default postSlice.reducer;
export const postsAction = postSlice.actions;
