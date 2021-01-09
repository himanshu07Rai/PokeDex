import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Details = (props) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // console.log(props);
  const [pokemonData, setPokemonData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await fetch(`${props.route.params.url}`);
    const data = await res.json();
    // console.log(data);
    setPokemonData(data);
  };
  // console.log(pokemonData);
  return pokemonData ? (
    <ScrollView>
      <View style={styles.container}>
        {/* {console.log(1)} */}
        <Image
          style={styles.image}
          source={{
            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${props.route.params.pokemon}.png`,
          }}
        />
        <Text style={styles.text}>
          Name: {capitalizeFirstLetter(pokemonData.name)}
        </Text>
        <Text style={styles.text}>Height: {pokemonData.height}</Text>
        <Text style={styles.text}>Weight: {pokemonData.weight}</Text>
        <Text style={styles.text}>
          Type: {capitalizeFirstLetter(pokemonData.types[0].type.name)}
        </Text>
        <Text style={styles.text}>
          Ability:{" "}
          {capitalizeFirstLetter(pokemonData.abilities[0].ability.name)}
        </Text>
        <Text style={styles.text}>
          Base Experience: {pokemonData.base_experience}
        </Text>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#00f" />
    </View>
  );
};
export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#9fe",
    height: 700,
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 22,
    marginBottom: 15,
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
