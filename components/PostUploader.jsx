import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import validUrl from 'valid-url';
import {
  getAuth,
  collection,
  addDoc,
  getDoc,
  doc,
  getFirestore,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from '../firebase';
import { navigationType } from '../helpers';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('URL is required'),
  caption: Yup.string().max(2200, 'Maximum caption length reached'),
});

const PLACEHOLDER_IMG =
  'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg';

const PostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [profile, setProfile] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const getProfile = async () => {
      const userDocRef = doc(db, `users/${auth.currentUser.email}`);
      const docSnap = await getDoc(userDocRef);
      const data = docSnap.data();

      setProfile({
        username: data.username,
        pic: data.pic,
        uid: data.uid,
        email: data.email,
      });
    };

    getProfile();
  }, []);

  const addPost = (imageUrl, caption) => {
    addDoc(collection(db, `users/${auth.currentUser.email}`, 'posts'), {
      timestamp: serverTimestamp(),
      username: profile.username,
      pic: profile.pic,
      uid: profile.uid,
      email: profile.email,
      caption,
      imageUrl,
      liked: [],
      comments: [],
    }).then(() => navigation.goBack());
  };

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => addPost(values.imageUrl, values.caption)}
      validationSchema={uploadPostSchema}
      validateOnMount
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri: validUrl.isUri(thumbnailUrl) || PLACEHOLDER_IMG }}
            />
            <TextInput
              style={styles.captionInput}
              placeholder="Write a caption..."
              placeholderTextColor="gray"
              multiline
              onChangeText={handleChange('caption')}
              onBlur={handleBlur('caption')}
              value={values.caption}
            />
          </View>
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={styles.urlInput}
            placeholder="Enter image URL"
            placeholderTextColor="gray"
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={styles.errorText}>{errors.imageUrl}</Text>
          )}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 20,
  },
  image: {
    borderRadius: 9,
    height: 100,
    width: 100,
  },
  captionInput: {
    color: 'white',
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
  },
  urlInput: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
});

PostUploader.propTypes = navigationType;

export default PostUploader;
