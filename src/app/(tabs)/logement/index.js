import { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, TextInput, View, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Appartement from "@/components/appartement.js";
import { useStore } from "@/store/store";
//import { chargerLogements } from "@/data/logements";
import { chargerLogements } from "@/api/gist";

export default function Logement() {
  const router = useRouter();

  const { ville = "", prixMax = "" } = useLocalSearchParams();
  const max = Number(prixMax) || Infinity;
  const recherche = ville.trim().toLowerCase();

  const logements = useStore((state) => state.logements);
  const setLogements = useStore((state) => state.setLogements);

  const [statut, setStatut] = useState("chargement");
  const [erreur, setErreur] = useState(null);

  const logementsFiltres = logements.filter(
    (l) => (!recherche || l.ville.toLowerCase() === recherche) && l.prix <= max
  );

  const charger = () => {
    setStatut("chargement");
    setErreur(null);
    chargerLogements()
      .then((data) => {
        setLogements(data);
        setStatut(data.length === 0 ? "vide" : "succes");
      })
      .catch((e) => {
        setErreur(e.message);
        setStatut("erreur");
      });
  };

  useEffect(() => {
    charger();
  }, []);
  if (statut === "chargement") {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" />
        <Text style={styles.videTexte}>Chargement des logements…</Text>
      </View>
    );
  }
  if (statut === "erreur") {
    return (
      <View style={styles.centre}>
        <Text style={styles.emoji}>⚠️</Text>
        <Text style={styles.videTexte}>Impossible de charger les logements</Text>
        <Text style={styles.detail}>{erreur}</Text>
        <Pressable onPress={charger} style={styles.bouton}>
          <Text style={styles.boutonTexte}>Réessayer</Text>
        </Pressable>
      </View>
    );
  }
  if (statut === "vide") {
    return (
      <View style={styles.centre}>
        <Text style={styles.emoji}>🏠</Text>
        <Text style={styles.videTexte}>Aucun logement disponible pour le moment</Text>
        <Pressable onPress={charger} style={styles.bouton}>
          <Text style={styles.boutonTexte}>Actualiser</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.titre}>Liste des Logement</Text>

      <TextInput
        style={styles.input}
        value={ville}
        onChangeText={(texte) => router.setParams({ ville: texte })}
        placeholder="Filtrer par ville (ex. Rennes)"
        autoCapitalize="words"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={logementsFiltres}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Appartement logement={item} />}
        ListHeaderComponent={
          <Text style={styles.compteur}>
            {logementsFiltres.length} logement{logementsFiltres.length > 1 ? "s" : ""}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.vide}>
            <Text style={styles.videTexte}>Aucun logement à « {ville.trim()} »</Text>
            <Pressable onPress={() => router.setParams({ ville: "" })} style={styles.bouton}> 
              <Text style={styles.boutonTexte}>Effacer le filtre</Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titre: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
    marginBottom: 35,   
  },
  input: {
    margin: 16,
    marginBottom: 0,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  compteur: { 
    color: "gray", 
    marginBottom: 12, 
    marginStart: 5 
  },
  vide: { 
    alignItems: "center", 
    marginTop: 40, gap: 12 
  },
  videTexte: { 
    fontSize: 16, 
    color: "#555" 
  },
  bouton: { 
    backgroundColor: "#ff5a6098", 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 8 
  },
  boutonTexte: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
});