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
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import logo from '../../../assets/images/logo.png';
import { Colors } from "@/constants/Colors";

export default function Incidents () {
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.zinc_200 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />

          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.red_600} />
          </Pressable>
        </View>

        <Text style={styles.title}>Cadastrar Novo Caso</Text>
        <Text style={styles.subtitle}>
          Descreva o caso detalhadamente{`\n`} 
          para encontrar um herói.
        </Text>

        <View style={styles.form}>

          <View>
            <Text style={styles.label}>Titulo</Text>
            <TextInput
              placeholder="Título do caso"
              placeholderTextColor={Colors.zinc_600}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              placeholder="Descrição"
              placeholderTextColor={Colors.zinc_600}
              editable
              multiline={true}
              maxLength={800}
              style={styles.inputText}
            />
          </View>

          <View>
            <Text style={styles.label}>Ong</Text>
            <TextInput
              placeholder="Ong responsável"
              placeholderTextColor={Colors.zinc_600}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Email para contato"
              placeholderTextColor={Colors.zinc_600}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>WhatsApp</Text>
            <TextInput
              placeholder="Whatsapp para contato"
              placeholderTextColor={Colors.zinc_600}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Valor</Text>
            <TextInput
              placeholder="Valor em reais"
              placeholderTextColor={Colors.zinc_600}
              style={styles.input}
            />
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
    color: Colors.zinc_500,
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
  inputText: {
    borderWidth: 1,
    borderColor: Colors.zinc_500,
    backgroundColor: Colors.zinc_200,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 80,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
    textAlignVertical: 'top',
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
});