/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {Text, TextInput, View, StyleSheet, Button} from 'react-native';
import UsersContext from '../context/UserContext';

export default ({route, navigation}) => {
  const [user, setUser] = React.useState(route.params ? route.params : {});
  const {dispatch} = useContext(UsersContext);
  console.log(route.params);
  return (
    <View style={style.form}>
      <Text>Name</Text>
      <TextInput
        style={style.input}
        onChangeText={name => setUser({...user, name})}
        placeholder="informe o nome"
        value={user.name}
      />
      <Text>Email</Text>
      <TextInput
        style={style.input}
        onChangeText={email => setUser({...user, email})}
        placeholder="informe o nome"
        value={user.email}
      />
      <Text>URL do Avatar</Text>
      <TextInput
        style={style.input}
        onChangeText={avatarUrl => setUser({...user, avatarUrl})}
        placeholder="informe o nome"
        value={user.avatarUrl}
      />
      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser',
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});
