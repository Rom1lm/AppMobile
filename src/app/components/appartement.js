import { Text, View, StyleSheet, Image } from "react-native";

const Logements = [{
  id:1,
  titre:"Logement",
  ville:"Lennon",
  prix:120,
  image:"https://fastly.picsum.photos/id/134/800/450.jpg?hmac=QYVmlerxizcmKZDM8QrvkgPvGHvbIGkV5nJK9sLxN5U"
},
{
  id:2,
  titre:"Logement2",
  ville:"Rennes",
  prix:400,
  image:"https://fastly.picsum.photos/id/134/800/450.jpg?hmac=QYVmlerxizcmKZDM8QrvkgPvGHvbIGkV5nJK9sLxN5U"
},
{
  id:3,
  titre:"Logement3",
  ville:"Màlaga",
  prix:600,
  image:"https://fastly.picsum.photos/id/134/800/450.jpg?hmac=QYVmlerxizcmKZDM8QrvkgPvGHvbIGkV5nJK9sLxN5U"
}];

export default function Index() {
  return (
    <View style={styles.container}>
      {Logements.map((logement) => (
        <View key={logement.id} style={styles.container}>
          <Text>Identifiant : {logement.id}</Text>
          <Text>Titre :{logement.titre}</Text>
          <Text>Ville : {logement.ville}</Text>
          <Text>Prix : {logement.Prix}</Text>
          <Image source={{url : logement.image}} style={styles.img}/>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img : {
    height: 150,
    width: 150,
  }
});