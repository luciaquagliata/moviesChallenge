import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet, ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../store/slices/moviesSlice';
import {RootState} from '../store/types';

const MoviesSearchScreen: React.FC = () => {
  const dispatch = useDispatch();
  const handleSearch = (term: string) => {
    dispatch(fetchMovies(term));
    setTerm('');
  };
  const movies = useSelector((state: RootState) => state.movies.movies);

  const [term, setTerm] = useState('');

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => handleSearch(term)}
      />
      <ResultsList results={movies} />
    </View>
  );
};

export default MoviesSearchScreen;
