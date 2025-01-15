import { 
  Image, 
  Pressable, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "@/constants/Colors";
import logo from '../../../assets/images/logo.png';

export default function RegisterOng() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.zinc_200 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo}/>

          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.red_600}/>
          </Pressable>
        </View>

        <Text style={styles.title}>Cadastro de Ong</Text>
        <Text style={styles.subtitle}>
          Cadastre-se e salve o dia.
        </Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Nome</Text>

            <TextInput 
              placeholder='Digite seu nome...' 
              placeholderTextColor={Colors.zinc_600} 
              style={styles.input} 
            />
          </View>

          <View>
            <Text style={styles.label}>Email</Text>

            <TextInput 
              placeholder='Digite seu email...' 
              placeholderTextColor={Colors.zinc_600} 
              style={styles.input} 
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>

            <TextInput 
              placeholder='Digite sua senha...' 
              placeholderTextColor={Colors.zinc_600} 
              style={styles.input} 
            />
          </View>

          <View>
            <Text style={styles.label}>Telefone</Text>

            <TextInput 
              placeholder='Digite seu telefone...' 
              placeholderTextColor={Colors.zinc_600} 
              style={styles.input} 
            />
          </View>

          <View style={styles.location}>
            <View>
              <Text style={styles.label}>Cidade</Text>

              <TextInput 
                placeholder='Digite sua cidade...' 
                placeholderTextColor={Colors.zinc_600} 
                style={styles.city} 
              />
            </View>

            <View>
              <Text style={styles.ufTitle}>UF</Text>

              <TextInput 
                placeholder='UF' 
                placeholderTextColor={Colors.zinc_600} 
                style={styles.uf} 
              />
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.5} style={styles.button}>
            <Text style={styles.buttonText}>Cadastro</Text>
          </TouchableOpacity>
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
  form: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
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
  location: {
    flexDirection: "row",
  },
  city: {
    width: 316,
    borderWidth: 1,
    borderColor: Colors.zinc_500,
    backgroundColor: Colors.zinc_200,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
  },
  ufTitle: {
    color: Colors.zinc_950,
    marginLeft: 8,
    marginBottom: 4,
  },
  uf: {
    width: 50,
    borderWidth: 1,
    borderColor: Colors.zinc_500,
    backgroundColor: Colors.zinc_200,
    borderRadius: 8,
    marginBottom: 16,
    marginLeft: 8,
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
})
