import { useCallback, useState } from "react";
import { 
  Alert,
  Image, 
  Pressable, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";

import api from "@/lib/axios";
import logo from '../../../assets/images/logo.png';
import { Colors } from "@/constants/Colors";

interface IncidentData {
  id: string;
  title: string;
  description: string;
  ong: string;
  email: string;
  whatsapp: string;
  value: string;
}

export default function Details() {
  const { id } = useLocalSearchParams();
  const incidentId = Array.isArray(id) ? id[0] : id;
  const [incidentData, setIncidentData] = useState<IncidentData | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchIncident = async () => {
        if (!incidentId) return;
        try {
          const response = await api.get(`incidents/${incidentId}`);
          setIncidentData(response.data);
        } catch (error) {
          Alert.alert("Erro ao carregar os dados do incidente");
        }
      };
  
      fetchIncident();
    }, [incidentId])
  );

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      Alert.alert("Copiado para a área de transferência!");
    }).catch(() => {
      Alert.alert("Erro ao copiar para a área de transferência");
    });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`incidents/${incidentId}`);
      Alert.alert("Incidente excluído com sucesso!");
      router.push("/(dashboard)/userlist/page");
    } catch (error) {
      Alert.alert("Erro ao excluir incidente.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.zinc_200 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo}/>

          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.red_600}/>
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.title}>Caso:</Text>
              <Text style={styles.subTitle}>{incidentData ? incidentData.title : ''}</Text>
            </View>

            <View style={styles.ong}>
              <Text style={styles.title}>ONG:</Text>
              <Text style={styles.subTitle}>{incidentData ? incidentData.ong : ''}</Text>
            </View>
          </View>

          <View style={styles.description}>
            <Text style={styles.title}>Descrição:</Text>
            <Text style={styles.subTitle}>
              {incidentData ? incidentData.description : ''}
            </Text>
          </View>

          <View style={styles.value}>
            <Text style={styles.title}>Valor:</Text>
            <Text style={styles.subTitle}>R$ {incidentData ? incidentData.value : ''}</Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.menuHeader}>
            <View>
              <TouchableOpacity 
                onPress={() => router.push("/(incidents)/new/page")} 
                style={styles.iconButton}
              >
                <Ionicons name="reader" size={24} color={Colors.red_600}/>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonFooter}>
              <TouchableOpacity 
                onPress={() => router.push(`/(incidents)/edit/${incidentId}`)} 
                style={styles.iconButton}
              >
                <Ionicons name="create" size={24} color={Colors.red_600}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
                <Ionicons name="trash" size={24} color={Colors.red_600}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.titleFooter}>
            Salve o dia!{"\n"}
            Seja o herói desse caso
          </Text>
          <Text style={styles.subTitle}>Entre em contato:</Text>

          <View style={styles.footer}>
            <TouchableOpacity 
              activeOpacity={0.5} 
              style={styles.button}
              onPress={() => handleCopyToClipboard}
            >
              <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.5} 
              style={styles.buttonRight}
              onPress={() => handleCopyToClipboard}
            >
              <Text style={styles.buttonText}>Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.zinc_200,
    marginLeft: 20,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingRight: 32,
    paddingLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    margin: 2,
  },
  backButton: {
    backgroundColor: Colors.zinc_200,
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 8,
  },
  buttonFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Colors.zinc_100,
    width: 370,
    padding: 16,
    marginTop: 8,
    marginLeft: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
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
  iconButton: {
    alignSelf: "flex-start",
    padding: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 8,
  },
  value: {
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    color: Colors.zinc_950,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleFooter: {
    color: Colors.zinc_950,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    color: Colors.zinc_500,
    marginBottom: 8,
  },
  ong: {
    marginRight: 32,
  },
  footer:{
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.red_600,
    width: 164,
    marginTop: 16,
    marginRight: 4,
    marginBottom: 8,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonRight: {
    backgroundColor: Colors.red_600,
    width: 164,
    marginTop: 16,
    marginLeft: 6,
    marginBottom: 8,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.zinc_100,
    fontWeight: "bold",
  },
})