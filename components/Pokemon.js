import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const Pokemon = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfeild, setSearchfeild] = useState("");
  useEffect(() => {
    fetchPokemons();
  }, []);
  const fetchPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500"); //fetching pokemons from database
    const p = await res.json();
    setPokemons(p.results); //storing fetched data
    // console.log(res);
  };

  //   console.log(pokemons);

  return pokemons ? (
    <View style={{ backgroundColor: "#9fe" }}>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Search Pokemons"
          onChangeText={(value) => setSearchfeild(value)}
          value={searchfeild}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {pokemons
            .filter(
              (pokemon) =>
                pokemon.name.toLowerCase().includes(searchfeild.toLowerCase()) //filtering pokemons based on search element
            )
            .map((pokemon, index) => {
              //displaying pokemons after filtering or alll he pokemons initially
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("Details", {
                      pokemon: pokemon.name,
                      url: pokemon.url,
                    })
                  }
                >
                  <Image
                    style={{ width: 150, height: 150 }}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
                    }}
                  />
                  <Text>{pokemon.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#00f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // marginTop: 30,
    marginBottom: 50,
  },
  card: {
    display: "flex",
    alignItems: "center",
    borderWidth: 1,
    borderBottomColor: "black",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchCont: {
    // position: "absolute",
    marginBottom: 10,
    left: "20%",
    // zIndex: 1,
    marginTop: 10,
  },
  searchfeild: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: 250,
    borderRadius: 50,
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Pokemon;
