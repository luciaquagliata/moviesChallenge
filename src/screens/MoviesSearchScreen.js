import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/slices/moviesSlice";

const MoviesSearchScreen = () => {
  const dispatch = useDispatch();
  const handleSearch = (term) => {
    dispatch(fetchMovies(term));
  };
  const movies = useSelector((state) => state.movies.movies);

  const [term, setTerm] = useState("");

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
