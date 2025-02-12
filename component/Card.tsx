import { 
  Alert, 
  Pressable, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";

import api from "@/lib/axios";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

interface IncidentData {
  id: string;
  title: string;
  description: string;
  ong: string;
  value: string;
}

interface CardProps {
  incident: IncidentData;
}

export function Card({ incident }: CardProps) {
  const handleDelete = async () => {
    try {
      await api.delete(`incidents/${incident.id}`);
      Alert.alert("Incidente excluído com sucesso!");
      router.push("/(dashboard)/userlist/page");
    } catch (error) {
      Alert.alert("Erro ao excluir incidente.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Caso:</Text>
          <Text style={styles.subTitle}>{incident.title}</Text>
        </View>

        <View style={styles.ong}>
          <Text style={styles.title}>ONG:</Text>
          <Text style={styles.subTitle}>{incident.ong}</Text>
        </View>
      </View>

      <View style={styles.spacing}>
        <Text style={styles.title}>Valor:</Text>
        <Text style={styles.subTitle}>R$ {incident.value}</Text>
      </View>

      <View style={styles.divider}></View>

      <View style={styles.footer}>
        <Pressable 
          onPress={() => router.push(`/(dashboard)/details/${incident.id}`)}
          style={styles.link}
        >
          <Text style={styles.textGhost}>
            Ver mais detalhes
          </Text>
          <Ionicons name="arrow-forward-sharp" size={16} color="red" />
        </Pressable>

        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <Ionicons name="trash" size={18} color={Colors.red_600}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.zinc_100,
    width: 370,
    padding: 16,
    marginTop: 8,
    marginLeft: 14,
    marginBottom: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  title: {
    color: Colors.zinc_950,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    color: Colors.zinc_500,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ong: {
    marginRight: 32,
  },
  spacing: {
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    backgroundColor: Colors.zinc_200,
    height: 1,
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  textGhost: {
    color: Colors.red_600,
    fontWeight: "bold",
    marginLeft: 8,
    marginRight: 10,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconButton: {
    alignSelf: "flex-start",
    padding: 4,
    marginLeft: 4,
    marginRight: 4,
  },
})
