import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import {
  getAuth,
  getFirestore,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
} from '../firebase';

const signupFormSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required()
    .min(6, 'Password must be at least 6 characters'),
});

const SignupForm = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore();

  const getRandomUserPicture = async () => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, password, username) => {
    try {
      const authorized = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('Firebase signup successful');

      const userDocRef = doc(db, 'users', authorized.user.email);
      await setDoc(userDocRef, {
        username,
        email,
        pic: await getRandomUserPicture(),
        uid: authorized.user.uid,
      });
    } catch (error) {
      if (Platform.OS === 'web') {
        alert(error.message);
      } else {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        onSubmit={(values) =>
          onSignup(values.email, values.password, values.username)
        }
        validationSchema={signupFormSchema}
        validateOnMount
      >
        {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length >= 3
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Username"
                autoCapitalize="none"
                textContentType="username"
                autoFocus
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>

            <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
              <Text style={{ color: '#6bb8f5' }}>Forget Password?</Text>
            </View>

            <Pressable
              titleSize={20}
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Already a member? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#6bb0f5' }}>Login Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#0096f6',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 50,
    justifyContent: 'center',
  },
});

export default SignupForm;
