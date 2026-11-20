import { Text, StyleSheet, View, Pressable } from "react-native";
import { useState, useEffect } from "react";

export default function Profil() {
    const [count, setCount] = useState(0);
    
    useEffect(() => console.log("mount"), [])
    
    useEffect(() => {
        console.log("le count a changé :", count);
    }, [count]);// fonctionne dès que ce qui est entre [] est modifié ici a chaque fois que count prend 1 
    
    const handleCount = () => {
        console.log(count);
        setCount((prev) => prev + 1);
        console.log(count);
    };

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Réglages</Text>
        <Text>{count}</Text>
        <Pressable onPress={handleCount} style={styles.bouton}>
            <Text>Incrémenter</Text>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bouton: {
        backgroundColor: "lightgray",
        paddingVertical: 10,
        paddingHorizontal: 20, 
        borderRadius: 8
    }
  });
