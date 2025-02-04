import { 
  Alert,
  Image, 
  Pressable, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { z } from "zod";

import api from "@/lib/axios";
import logo from '../../../assets/images/logo.png';
import { Colors } from "@/constants/Colors";

const loginOngSchema = z.object({
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginOngSchema = z.infer<typeof loginOngSchema>;

export default function SignInOng() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginOngSchema>({
    resolver: zodResolver(loginOngSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authOngToken');
      if (token) {
        router.replace('/(dashboard)/userlist/page');
      }
    };
    checkToken();
  }, []);

  const onSubmit = async (data: LoginOngSchema) => {
    try {
      if (!data.email || !data.password) {
        Alert.alert('Por favor, forneça o e-mail e a senha.');
        return;
      }

      const response = await api.post('auth-ong/login', data, { withCredentials: true });

      if (response.data.accessToken) {
        await AsyncStorage.setItem('authOngToken', response.data.accessToken);
        Alert.alert(`Usuário Logado: ${data.email}, Seja Bem vindo!`);
        router.push("/(dashboard)/userlist/page");
      } else {
        Alert.alert('Token não encontrado na resposta.');
      }
    } catch (error) {
      Alert.alert('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.zinc_200 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo}/>
        </View>

        <Text style={styles.title}>Acesso ONG</Text>
        <Text style={styles.subtitle}>
          Entre e salve o dia.
        </Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Email</Text>

            <TextInput 
              placeholder='Digite seu email...' 
              placeholderTextColor={Colors.zinc_600} 
              style={styles.input} 
              onChangeText={(text) => setValue('email', text)}
              value={watch("email")}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Password</Text>

            <TextInput 
              placeholder='Digite sua senha...' 
              placeholderTextColor={Colors.zinc_600} 
              style={styles.input} 
              onChangeText={(text) => setValue('password', text)}
              value={watch("password")}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          </View>

          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={handleSubmit(onSubmit)} 
            style={styles.button}
          >
            <Text style={styles.buttonText}>Acesso</Text>
          </TouchableOpacity>

          <Pressable 
            onPress={() => router.push('/(auth)/registerong/page')} 
            style={styles.link}
          >
            <Ionicons name="arrow-forward-sharp" size={16} color="red" />
            <Text style={styles.textGhost}>
              Não Tenho Cadastro
            </Text>
          </Pressable>

          <Pressable 
            onPress={() => router.push('/')} 
            style={styles.link}
          >
            <Ionicons name="arrow-forward-sharp" size={16} color="red" />
            <Text style={styles.textGhost}>
              Volte para acesso do usuário
            </Text>
          </Pressable>
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
  },
  error: {
    color: Colors.red_600,
    fontSize: 12,
    marginTop: 4,
  }
})
