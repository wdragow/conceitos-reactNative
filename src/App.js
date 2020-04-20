import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [ repositories , setRepositories ] = useState([]);

  useEffect(() =>  {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);

    const likedRepository = response.data;

    const repositoriesUpdated = repositories.map(repository => {
      if(repository.id === id){
        return likedRepository;
      } else {
        return repository;
      }
    });

    setRepositories(repositoriesUpdated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3DC2BF"/>
      <SafeAreaView style={styles.container}>
        <Text style={styles.appTitle}>Desafio React Native GoStack</Text>
          <FlatList
            data={repositories}
            keyExtractor={repository => repository.id}
            renderItem={({ item: repository }) => ( 
                <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>

                <View style={styles.techsContainer}>
                  <FlatList
                    style={styles.flatlistTechs}
                    data={repository.techs}
                    keyExtractor={item => item}
                    renderItem={({ item: tech }) => (
                      <Text style={styles.tech}>
                        {tech}
                      </Text>
                    )}
                  />
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes} curtidas
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3DC2BF",
  },
  appTitle:{
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 20,
    marginTop: 5,
  },
  repositoryContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,   
    elevation: 18,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#3DC2BF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,   
    elevation: 18,
    textAlign: 'center'
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#3DC2BF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,   
    elevation: 18,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    backgroundColor: "#3DC2BF",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,   
    elevation: 18,
    textAlign: 'center'
  },
  flatlistTechs: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
});
