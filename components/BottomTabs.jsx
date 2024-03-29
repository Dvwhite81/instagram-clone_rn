import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { iconsType, iconType } from '../helpers';

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon
            key={index}
            icon={icon}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </View>
    </View>
  );
};

const Icon = ({ icon, activeTab, setActiveTab }) => {
  return (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{
          uri: activeTab === icon.name ? icon.active : icon.inactive,
        }}
        style={[
          styles.icon,
          icon.name === 'Profile' ? styles.profilePic : null,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'sticky',
    width: '100%',
    bottom: 0,
    backgroundColor: '#000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

BottomTabs.propTypes = iconsType;
Icon.propTypes = iconType;

export default BottomTabs;
