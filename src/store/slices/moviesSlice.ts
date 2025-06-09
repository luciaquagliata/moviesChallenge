import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import IMDb from '../../api/IMDb';

interface Movie {
  id: string;
  title: string;
  image: string;
}

interface MoviesState {
  errorMessage: string;
  searchTerm: string;
  movies: Movie[];
}

interface MovieResponse {
  id: string;
  primaryTitle: string;
  primaryImage: string;
}

interface ApiResponse {
  data: MovieResponse[];
  searchTerm: string;
}

export const fetchMovies = createAsyncThunk<ApiResponse, string>(
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

const initialState: MoviesState = {
  errorMessage: '',
  searchTerm: '',
  movies: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
      state.searchTerm = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
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
        state.errorMessage = action.payload as string || 'Unknown error';
      });
  },
});

export default moviesSlice.reducer;
export const {clearMovies} = moviesSlice.actions;
