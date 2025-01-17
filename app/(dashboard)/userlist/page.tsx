import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import logo from '../../../assets/images/logo.png';
import { Colors } from "@/constants/Colors";
import { Card } from "@/component/Card";

export default function UserList() {
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.zinc_200 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo}/>
        </View>

        <Text style={styles.title}>Bem Vindo!</Text>
        <Text style={styles.subtitle}>
          Escolha um dos casos abaixo{"\n"}e salve o dia.
        </Text>

        <ScrollView>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
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