import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PostUploader from './PostUploader';
import { navigationType } from '../helpers';

const AddNewPost = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NewPostHeader navigation={navigation} />
      <PostUploader navigation={navigation} />
    </View>
  );
};

const NewPostHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.headerImg}
          source={{
            uri: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/back--v1.png',
          }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>NEW POST</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerImg: {
    height: 30,
    width: 30,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 700,
    marginRight: 25,
  },
});

AddNewPost.propTypes = navigationType;
NewPostHeader.propTypes = navigationType;

export default AddNewPost;
