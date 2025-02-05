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
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from 'axios';

import api from "@/lib/axios";
import { Colors } from "@/constants/Colors";
import logo from '../../../assets/images/logo.png';

const registerSchema = z.object({
  name: z.string().min(3, "Nome de usuário é obrigatório"),
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: z.string().min(13, "O telefone deve ter pelo menos 13 caracteres"),
  city: z.string().min(4, "Cidade deve ter pelo menos 4 caracteres"),
  uf: z.string().min(2, "Estados deve ter pelo menos 2 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterOng() {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {

      const response = await api.post('ongs', {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        city: data.city,
        uf: data.uf,
      });

      if(response.status === 200 || response.status === 201){
        Alert.alert('Usuário criado com sucesso')
        router.push("(auth)/signinnong/page");
      }
    } catch (error: any) {
      Alert.alert('Error:' +(error));

      if (axios.isAxiosError(error)) {
        if (error.response) {
          Alert.alert(
            'O registro falhou: ' + (error.response.data.message || 
            'Por favor, verifique suas informações e tente novamente.')
          );
        } else if (error.request) {
          Alert.alert('Falha no registro: Nenhuma resposta do servidor.');
        } else {
          Alert.alert('O registro falhou: ' + error.message);
        }
      } else {
        Alert.alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
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

        <Text style={styles.title}>Cadastro de Ong</Text>
        <Text style={styles.subtitle}>
          Cadastre-se e salve o dia.
        </Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Nome</Text>

            <Controller 
              control={control} 
              name="name" 
              render={({ field: { onChange, value } }) => (
                <TextInput 
                  placeholder='Digite seu nome...' 
                  placeholderTextColor={Colors.zinc_600} 
                  style={styles.input} 
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name?.message && <Text style={styles.error}>{String(errors.name.message)}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Email</Text>

            <Controller 
              control={control} 
              name="email" 
              render={({ field: { onChange, value } }) => (
                <TextInput 
                  placeholder='Digite seu email...' 
                  placeholderTextColor={Colors.zinc_600} 
                  style={styles.input} 
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email?.message && <Text style={styles.error}>{String(errors.email.message)}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Password</Text>

            <Controller 
              control={control} 
              name="password" 
              render={({ field: { onChange, value } }) => (
                <TextInput 
                  placeholder='Digite sua senha...' 
                  placeholderTextColor={Colors.zinc_600} 
                  secureTextEntry
                  style={styles.input} 
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.password?.message && <Text style={styles.error}>{String(errors.password.message)}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Telefone</Text>

            <Controller 
              control={control} 
              name="phone" 
              render={({ field: { onChange, value } }) => (
                <TextInput 
                  placeholder='Digite seu telefone...' 
                  placeholderTextColor={Colors.zinc_600} 
                  style={styles.input} 
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.phone?.message && <Text style={styles.error}>{String(errors.phone.message)}</Text>}
          </View>

          <View style={styles.location}>
            <View>
              <Text style={styles.label}>Cidade</Text>

              <Controller 
                control={control} 
                name="city" 
                render={({ field: { onChange, value } }) => (
                  <TextInput 
                    placeholder='Digite sua cidade...' 
                    placeholderTextColor={Colors.zinc_600} 
                    style={styles.city}
                    value={value}
                    onChangeText={onChange} 
                  />
                )}
              />
              {errors.city?.message && <Text style={styles.error}>{String(errors.city.message)}</Text>}
            </View>

            <View>
              <Text style={styles.ufTitle}>UF</Text>

              <Controller 
                control={control} 
                name="uf" 
                render={({ field: { onChange, value } }) => (
                  <TextInput 
                    placeholder='UF' 
                    placeholderTextColor={Colors.zinc_600} 
                    style={styles.uf}
                    value={value}
                    onChangeText={onChange}  
                  />
                )}
              />
              {errors.uf?.message && <Text style={styles.error}>{String(errors.uf.message)}</Text>}
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={handleSubmit(onSubmit)}>
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
  error: { 
    color: Colors.red_600, 
    fontSize: 14, 
    marginTop: 5 
  },
})
