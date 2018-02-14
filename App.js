import React from 'react';
import { StyleSheet, Text, View,ScrollView,ActivityIndicator,Image,Alert } from 'react-native';
import axios from 'axios'
import {Card} from "react-native-elements"

const Profile = ({
  profile: {
    name: { first = "",  last = "default" },
    login: { username},
    picture: { medium },
    email,
    location: {city}
  },
  onPress
}) => (
  <Card style={{ padding:0, margin: 0}}>
  <View style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}>
    
    <Image
      style={styles.circle}
      source={{ uri: medium }}
      
    />
    <Text
      style={styles.text}
      
    >Name :- {`${first}  ${last}`}</Text>
    <Text>Email :- {`${email}`}</Text>
    <Text>City :- {`${city}`}</Text>
  </View>
  </Card>
)

export default class App extends React.Component {

  
  state = {
    profiles: [],
    loading: false
  }

  componentDidMount() {
    this.fetchUsers()
  }

  async fetchUsers() {
    this.setState({ loading: true })
    const users = await axios.get(`https://randomuser.me/api?results=3`)
    this.setState({ profiles: users.data.results })
    this.setState({ loading: false })
  }
  render() {
      const profiles = this.state.profiles

      if (this.state.loading) {
        return (
          <View style={{ flex: 1, paddingTop: 50 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      }


      return (
        <ScrollView style={styles.container}>
          {profiles.map(profile => (
            <Profile
              profile={profile}
              
            />
          ))}
        </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 50,
    padding: 30
  },
  text: {
    fontSize: 18,
    color: "#36454f",
    marginBottom: 20
  },
  circle: {
    width: 150, 
    height: 150, 
    marginBottom: 10, 
    borderRadius: 75
  }
})
