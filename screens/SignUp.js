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
import ActiveIndicator from '../components/ActiveIndecator';
import {FormValidationSignUp} from '../components/FormValidation';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [signUp, setSignUp] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setSignUp(true);
        const value = await AsyncStorage.getItem('TradeWithGPT');
        if (!value) {
          console.log('there are issue in async or async is empty');
        } else {
          navigation.navigate('MainLayout');
        }
      } catch (e) {
        console.log('error in async', e);
      } finally {
        setSignUp(false);
      }
    };
    getData();
  }, []);

  const handleSignUp = async () => {
    try {
      setSignUp(true);

      const errorMessage = FormValidationSignUp(email, password, name);

      if (errorMessage) {
        setErrMessage(errorMessage);
        console.log('error ', errorMessage);
        return;
      }

      const res = await axios.post(
        'https://netflix-gp-twith-mern.vercel.app/register',
        {
          email: email,
          password: password,
          fullName: name,
        },
      );
      navigation.navigate('MainLayout');
    } catch (error) {
      setErrMessage('Invalid credentials');
      console.log(error);
    } finally {
      setTimeout(() => {
        setErrMessage('');
      }, 2000);
      setSignUp(false);
    }
  };

  if (signUp) {
    return <ActiveIndicator />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.Container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.Container]}>
          <View style={{paddingTop: 60, paddingBottom: 50}}>
            <Text
              style={{
                borderColor: 'white',
                borderWidth: 2,
                fontSize: 25,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 5,
              }}>
              TradeWithGPT
            </Text>
          </View>

          <View style={styles.FormContainer}>
            <Text style={{paddingTop: 20, paddingLeft: 15, fontSize: 30}}>
              Sign Up
            </Text>
            <View>
              <Text style={styles.EmailText}>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholderTextColor="gray"
                placeholder="Enter your name"
                style={styles.InputEmail}></TextInput>
            </View>
            <View>
              <Text style={styles.EmailText}>Email</Text>
              <TextInput
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

            <Pressable onPress={handleSignUp} style={styles.PressableButton}>
              <Text style={styles.ButtonText}>Sign up</Text>
            </Pressable>
            {errMessage && (
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 15,
                  paddingTop: 15,
                  color: 'red',
                }}>
                {errMessage}
              </Text>
            )}
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
              onPress={() => navigation.navigate('SignIn')}
              style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 15,
                  textDecorationLine: 'underline',
                  fontWeight: 600,
                }}>
                Already registered user?
              </Text>
              <Text style={{fontSize: 18}}> Sign in now</Text>
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
    padding: 0,
  },

  FormContainer: {
    backgroundColor: '#3B3B3B',
    flex: 1,
    width: '100%',
    marginTop: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  SignInText: {
    paddingLeft: 15,
    fontSize: 20,
    marginTop: 10,
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
