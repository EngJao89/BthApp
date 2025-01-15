import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import logo from '../../../assets/images/logo.png';

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
    justifyContent: 'space-between'
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.zinc_950,
    marginTop: 16,
    marginLeft: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.zinc_400,
    marginTop: 10,
    marginLeft: 16,
    marginBottom: 16,
  },
})