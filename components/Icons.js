import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Icons = ({name}) => {
  return (
    <>
      <View>
        <Icon name={name === 'empty' ? 'pencil' : name} size={45} />
      </View>
    </>
  );
};

export default Icons;
