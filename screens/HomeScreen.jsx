import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BottomTabs from '../components/BottomTabs';
import Header from '../components/Header';
import Post from '../components/Post';
import Stories from '../components/Stories';
import TABS from '../data/tabs';
import {
  collectionGroup,
  getDocs,
  getFirestore,
  query,
  orderBy,
} from '../firebase';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const db = getFirestore();

  const getPosts = async () => {
    const postsToGet = query(
      collectionGroup(db, 'posts'),
      orderBy('timestamp', 'desc')
    );
    const snapshot = await getDocs(postsToGet);
    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottomTabs icons={TABS} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default HomeScreen;
