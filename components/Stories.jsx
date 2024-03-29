import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { USERS } from '../data/users';

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((user, index) => (
          <View key={index} style={styles.center}>
            <Image style={styles.image} source={{ uri: user.image }} />
            <Text style={styles.white}>
              {user.user.length > 12
                ? `${user.user.slice(0, 11).toLowerCase()}...`
                : user.user.slice(0, 11).toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 13,
  },
  center: {
    alignItems: 'center',
  },
  image: {
    borderColor: '#ff8501',
    borderRadius: 50,
    borderWidth: 3,
    height: 70,
    marginLeft: 6,
    resizeMode: 'contain',
    width: 70,
  },
  white: {
    color: 'white',
  },
});

export default Stories;
