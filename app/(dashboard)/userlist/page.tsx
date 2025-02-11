import { 
  Alert,
  Image, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import logo from '../../../assets/images/logo.png';
import { Colors } from "@/constants/Colors";
import { Card } from "@/component/Card";
import api from "@/lib/axios";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  accessToken: string;
}

interface IncidentData {
  id: string;
  title: string;
  description: string;
  ong: string;
  value: string;
}

export default function UserList() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [incidents, setIncidents] = useState<IncidentData[]>([]);

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('authToken');

      setUserData(null);

      Alert.alert('Você saiu! Até breve...');
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro ao fazer logout:");
    }
  }

  const fetchIncident = useCallback(async () => {
    try {
      const response = await api.get<IncidentData[]>('incidents');
      setIncidents(response.data);
    } catch (error: any) {
      Alert.alert("Erro ao carregar os casos.");
    }
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const storedData = await AsyncStorage.getItem('authToken');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    }
    fetchUserData();
    fetchIncident();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchIncident();
    }, [])
  );

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.zinc_200 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo}/>
          <TouchableOpacity onPress={() => handleLogout()} style={styles.logout}>
            <AntDesign name="logout" size={24} color="red" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Bem Vindo!</Text>
        <Text style={styles.subtitle}>
          Escolha um dos casos abaixo{"\n"}e salve o dia.
        </Text>

        <ScrollView>
          {incidents.map((incident) => (
            <Card key={incident.id} incident={incident}/>
          ))}
        </ScrollView>
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
    paddingRight: 24,
    paddingLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    margin: 2,
  },
  logout: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: Colors.zinc_200,
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 8,
  },
  title: {
    color: Colors.zinc_950,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
  },
  subtitle: {
    color: Colors.zinc_500,
    fontSize: 16,
    marginTop: 10,
    marginLeft: 16,
    marginBottom: 16,
  },
})
