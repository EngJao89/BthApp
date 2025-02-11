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
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from 'axios';

import api from "@/lib/axios";
import logo from '../../../assets/images/logo.png';
import { Colors } from "@/constants/Colors";

const registerSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  description: z.string().min(15, "Descrição é obrigatória"),
  ong: z.string().min(3, "Ong é obrigatório"),
  email: z.string().email("E-mail é obrigatório"),
  whatsapp: z.string().min(13, "O whatsapp deve ter pelo menos 13 caracteres"),
  value: z.string().min(4, "Insira um valor válido"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export default function Incidents () {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  
  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await api.post('incidents', data);
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Incidente criado com sucesso');
        router.back();
      }
    } catch (error: any) {
      if (error) {
        if (error.response) {
          Alert.alert(
            'O registro de incidente falhou: ' + 
            (error.response.data.message || 'Por favor, tente novamente.')
          );
        } else if (error.request) {
          Alert.alert('Falha ao criar incidente: Nenhuma resposta do servidor.');
        } else {
          Alert.alert('Falha ao criar incidente: ' + error.message);
        }
      } else {
        Alert.alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

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

            <Controller 
              control={control} 
              name="title" 
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Título do caso"
                  placeholderTextColor={Colors.zinc_600}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.title?.message && <Text style={styles.error}>{String(errors.title.message)}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Descrição</Text>

            <Controller 
              control={control} 
              name="description" 
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Descrição"
                  placeholderTextColor={Colors.zinc_600}
                  editable
                  multiline={true}
                  maxLength={800}
                  style={styles.inputText}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.description?.message && <Text style={styles.error}>{String(errors.description.message)}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Ong</Text>

            <Controller 
              control={control} 
              name="ong" 
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Ong responsável"
                  placeholderTextColor={Colors.zinc_600}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.ong?.message && <Text style={styles.error}>{String(errors.ong.message)}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Email</Text>

            <Controller 
              control={control} 
              name="email" 
              render={({ field: { onChange, value}}) => (
                <TextInput
                  placeholder="Email para contato"
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
            <Text style={styles.label}>WhatsApp</Text>

            <Controller 
              control={control} 
              name="whatsapp" 
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Whatsapp para contato"
                  placeholderTextColor={Colors.zinc_600}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
              )} 
            />
            {errors.whatsapp?.message && <Text style={styles.error}>{String(errors.whatsapp.message)}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Valor</Text>

            <Controller 
              control={control} 
              name="value" 
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Valor em reais"
                  placeholderTextColor={Colors.zinc_600}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
              )} 
            />
            {errors.value?.message && <Text style={styles.error}>{String(errors.value.message)}</Text>}
          </View>

          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={handleSubmit(onSubmit)} 
            style={styles.button}
          >
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
  error: { 
    color: Colors.red_600, 
    fontSize: 14, 
    marginTop: 5 
  },
});