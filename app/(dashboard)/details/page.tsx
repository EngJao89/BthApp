import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import logo from '../../../assets/images/logo.png';
import { Colors } from "@/constants/Colors";

export default function Details() {
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
              <Text style={styles.subTitle}>Cadelinha Atropelada</Text>
            </View>

            <View style={styles.ong}>
              <Text style={styles.title}>ONG:</Text>
              <Text style={styles.subTitle}>APAD</Text>
            </View>
          </View>

          <View style={styles.description}>
            <Text style={styles.title}>Descrição:</Text>
            <Text style={styles.subTitle}>
              A cadelinha Jolie foi atropelada por um carro 
              no bairro Santana e teve que passar por uma 
              cirurgia às pressas.
            </Text>
          </View>

          <View style={styles.value}>
            <Text style={styles.title}>Valor:</Text>
            <Text style={styles.subTitle}>R$ 120,00</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.titleFooter}>
            Salve o dia!{"\n"}
            Seja o herói desse caso
          </Text>
          <Text style={styles.subTitle}>Entre em contato:</Text>

          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.5} style={styles.button}>
              <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} style={styles.button}>
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
  },
  header: {
    padding: 24,
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
  card: {
    backgroundColor: Colors.zinc_100,
    width: 370,
    padding: 16,
    marginTop: 8,
    marginLeft: 16,
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
    marginLeft: 4,
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