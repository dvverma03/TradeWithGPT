import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {COLORS} from '../constants';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import ActiveIndicator from '../components/ActiveIndecator';
import { FormValidationSignIn } from '../components/FormValidation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch= useDispatch()
  const [signIn, setSignIn]= useState(false)
  const [errMessage, setErrMessage]= useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('TradeWithGPT');
        if (!value) {
        } else {
          navigation.navigate('MainLayout');
        }
      } catch (e) {
        console.log('error in async', e);
      }
    };
    getData();
  }, []);

  const handleSign = async () => {
    try {
      setSignIn(true)

      const errorMessage= FormValidationSignIn(email, password)

      if(errorMessage){
        setErrMessage(errorMessage)
        console.log("error ", errorMessage)
        return ;
      }

      const res = await axios.post(
        'https://netflix-gp-twith-mern.vercel.app/login',
        {
          email: email,
          password: password,
        },
      );

      dispatch(addUser(res?.config?.data))
      const storeData = async () => {
        try {
          await AsyncStorage.setItem('TradeWithGPT', 'TradeWithGPT');
        } catch (e) {
          console.log('there are issue in async storage', e);
        }
      };
      storeData();
      navigation.navigate('MainLayout');
    } catch (error) {
      console.log(error);
      setErrMessage("Invalid credentials")
    }finally{
      setTimeout(()=>{
         setErrMessage("")
      },2000)
      setSignIn(false)
    }
  };

  if(signIn){
    return (
      <ActiveIndicator/>
    )
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.Container}
      >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.Container]}>
          <View style={{paddingTop: 60, paddingBottom: 50}}>
            <Text
              style={{
                borderColor: 'white',
                borderWidth: 2,
                fontSize: 25,
                paddingHorizontal: 50,
                paddingVertical: 8,
                borderRadius: 5,
              }}>
              StockX
            </Text>
          </View>

          <View style={styles.FormContainer}>
            <Text style={{paddingTop: 20, paddingLeft: 15, fontSize: 30}}>
              Sign In
            </Text>
            <View>
              <Text style={styles.EmailText}>Email</Text>
              <TextInput
                type="text"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="gray"
                placeholder="you@mail.com"
                style={styles.InputEmail}></TextInput>
            </View>
            <View>
              <View>
                <Text style={styles.EmailText}>Password</Text>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="gray"
                  placeholder="password"
                  style={styles.InputEmail}></TextInput>
              </View>
            </View>

            <Pressable onPress={handleSign} style={styles.PressableButton}>
              <Text style={styles.ButtonText}>Sign in</Text>
            </Pressable>
            {errMessage && <Text style={{fontSize:18, paddingLeft:15, paddingTop:15, color:'red'}}>{errMessage}</Text>}
            <View style={styles.SignupLinkContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'gray',
                }}>
                By signing up, you agree to the{' '}
                <Text
                  style={{
                    color: 'gray',
                  }}>
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text
                  style={{
                    color: 'gray',
                  }}>
                  Privacy Policy
                </Text>{' '}
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
              style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 15,
                  textDecorationLine: 'underline',
                  fontWeight: 600,
                }}>
                Create your account?
              </Text>
              <Text style={{fontSize: 18}}> Sign up now</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#1E1E1E',
    height: '100%',
    alignItems: 'center',
    width: '100%',
    marginHorizontal:0
  },

  FormContainer: {
    backgroundColor: '#3B3B3B',
    flex: 1,
    width: '100%',
    marginTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  SignInText: {
    paddingLeft: 15,
    fontSize: 20,
    marginTop: 20,
    lineHeight: 27,
  },
  InputEmail: {
    borderColor: '#eae3e3',
    borderWidth: 2,
    padding: 5,
    paddingBottom: 15,
    paddingLeft: 20,
    fontSize: 20,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  EmailText: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 15,
    marginTop: 15,
    color: 'white',
  },
  PressableButton: {
    backgroundColor: '#7a0eed',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 25,
  },
  ButtonText: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
    color: 'white',
  },
  SignupLinkContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 15,
    gap: 10,
  },
  Error: {
    color: 'red',
    fontSize: 16,
    paddingLeft: 15,
    marginTop: 10,
  },
});
