/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';
import {Button, Icon} from '@rneui/base';
import UsersContext from '../context/UserContext';

export default props => {
  const {state, dispatch} = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        },
      },
      {text: 'Não'},
    ]);
  }

  function getAction(user) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    );
  }

  function getUserItem({item: user}) {
    return (
      <>
        <ListItem
          bottomDivider
          onPress={() => props.navigation.navigate('UserForm', user)}>
          <Avatar rounded title={user.name[0]} source={{uri: user.avatarUrl}} />
          <ListItem.Content>
            <ListItem.Title>{user.name}</ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
          {getAction(user)}
          <ListItem.Chevron />
        </ListItem>
      </>
    );
  }

  return (
    <View>
      <FlatList
        data={state.users}
        keyExtractor={user => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};
