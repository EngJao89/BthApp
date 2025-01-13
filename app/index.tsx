import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from "@/constants/Colors";
import logo from '../assets/images/logo.png';

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.zinc_200 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo}/>

        </View>
        <Text style={styles.title}>Acesso Usuário</Text>
        <Text style={styles.subtitle}>
          Entre e salve o dia.
        </Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Email</Text>

          <TextInput placeholder='Digite seu email...' placeholderTextColor={Colors.zinc_600}  style={styles.input} />
        </View>

        <View>
          <Text style={styles.label}>Password</Text>

          <TextInput placeholder='Digite sua senha...' placeholderTextColor={Colors.zinc_600} style={styles.input} />
        </View>

        <TouchableOpacity activeOpacity={0.5} style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <Pressable style={styles.link}>
          <Ionicons name="arrow-forward-sharp" size={16} color="red" />
          <Text style={styles.textGhost}>Não Tenho Cadastro</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.zinc_200,
  },
  header: {
    padding: 24,
  },
  logo: {
    margin: 2,
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
  },
  form: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 36,
    paddingLeft: 14,
    paddingRight: 14,
  },
  label: {
    color: Colors.zinc_950,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.zinc_500,
    backgroundColor: Colors.zinc_200,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
  },
  button: {
    backgroundColor: Colors.red_600,
    marginTop: 16,
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
  textGhost: {
    color: Colors.zinc_950,
    fontWeight: "bold",
    marginLeft: 8,
    marginRight: 10,
  },
  link: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  }
});