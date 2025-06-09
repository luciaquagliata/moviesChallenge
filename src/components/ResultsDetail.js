import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const ResultsDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{result.title}</Text>
      <Image
        style={styles.image}
        source={{
          uri: result.image,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 25,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default ResultsDetail;
