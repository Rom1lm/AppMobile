import { Drawer } from "expo-router/drawer";

export default function ProfilLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Profil" }} />
      <Drawer.Screen name="reglage" options={{ title: "Réglages" }} />
      <Drawer.Screen name="recherche" options={{ title: "Recherche" }} />
    </Drawer>
  );
}