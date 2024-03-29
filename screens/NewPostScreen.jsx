import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AddNewPost from '../components/AddNewPost';

const NewPostScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <AddNewPost navigation={navigation} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default NewPostScreen;
