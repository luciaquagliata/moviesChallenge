import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ResultsDetail from "./ResultsDetail";

interface Result {
  id: string;
  title: string;
  image: string;
}

interface ResultsListProps {
  results: Result[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  if (!results.length) {
    return (
      <View>
        <Text style={styles.text}>No movies, look for some</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return <ResultsDetail result={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },
  container: {
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default ResultsList;
