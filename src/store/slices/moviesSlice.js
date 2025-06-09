import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import IMDb from '../../api/IMDb';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchTerm, thunkAPI) => {
    try {
      const response = await IMDb.get('', {
        params: {query: searchTerm},
      });
      return {data: response.data, searchTerm};
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    errorMessage: '',
    searchTerm: '',
    movies: [],
  },
  reducers: {
    clearMovies: state => {
      state.movies = [];
      state.searchTerm = '';
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const movies = action.payload.data
          .filter(movie => movie.primaryImage)
          .map(movie => ({
            id: movie.id,
            title: movie.primaryTitle,
            image: movie.primaryImage,
          }));

        state.movies = [];
        state.movies = movies;
        state.searchTerm = action.payload.searchTerm;
        state.errorMessage = '';
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Unknown error';
      });
  },
});

export default moviesSlice.reducer;
export const {clearMovies} = moviesSlice.actions;
