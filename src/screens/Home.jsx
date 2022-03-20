import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Card from "../component/Card";
import CustomButton from "../component/CustomButton";

const seasonArray = [
  { id: 1, name: "Season 1", icon: "S1", selected: false },
  { id: 2, name: "Season 2", icon: "S2", selected: false },
  { id: 3, name: "Season 3", icon: "S3", selected: false },
  { id: 4, name: "Season 4", icon: "S4", selected: false },
  { id: 5, name: "Season 5", icon: "S5", selected: false },
];

const Home = (props) => {
  const { navigation } = props;
  const [characters, setCharacters] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [season, setSeason] = useState(seasonArray);
  const [overallCharacters, setOverallCharacters] = useState([]);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://breakingbadapi.com/api/characters"
      );
      if (response?.data) {
        setCharacters([...response.data]);
        setOverallCharacters([...response.data]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  };

  const onSearchCharacter = async (text) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://breakingbadapi.com/api/characters?name=${text}`
      );
      if (response?.data) {
        setCharacters([...response.data]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  };

  const setFilters = (item) => {
    const selectedSeason = [...season].map((element) => {
      if (item.id === element.id) {
        element.selected = !element.selected;
      }
      return element;
    });
    setSeason(selectedSeason);
  };

  const applyFilter = () => {
    const filters = season
      .filter((element) => element.selected)
      .map((element) => element.id);
    if (!filters.length) return alert("Select filter");
    setSelectedFilters(filters);
    setFilterModal(false);
  };

  const clearFilter = () => {
    const seasons = season.map((element) => {
      element.selected = false;
      return element;
    });
    setSeason(seasons);
  };

  const closeModal = () => {
    setFilterModal(false);
  };

  const listHeaderComponent = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onSearchCharacter}
        placeholder={"Search Character"}
      />
      <Pressable
        onPress={() => {
          setFilterModal(true);
        }}
        style={{ position: "relative" }}
      >
        <Image
          source={require("../../assets/filter-outline-filled.png")}
          style={{ width: 30, height: 30 }}
        />
        {selectedFilters.length ? <View style={styles.redDot} /> : null}
      </Pressable>
    </View>
  );

  const renderItem = (item) => (
    <Card>
      <Image
        source={{ uri: item.img }}
        style={{ width: 200, height: 200 }}
        resizeMethod="resize"
        resizeMode="center"
      />
      <Text>{item.name}</Text>
      <Text>season {item.appearance.join(",")}</Text>
      <CustomButton
        title="Details"
        pressAction={() =>
          navigation.navigate("Details", {
            item: item,
          })
        }
      />
    </Card>
  );

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (selectedFilters.length) {
      const filterCharacter = overallCharacters.filter((character) => {
        for (let i = 0; i < selectedFilters.length; i++) {
          if (character.appearance.includes(selectedFilters[i])) {
            return character;
          }
        }
      });
      setCharacters(filterCharacter);
    } else {
      setCharacters(overallCharacters);
    }
  }, [selectedFilters]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {listHeaderComponent()}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={styles.activityIndicatorContainer}
        />
      ) : (
        <FlatList
          data={characters}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.char_id}
        />
      )}

      <Modal animationType="slide" transparent={true} visible={filterModal}>
        <View style={styles.backDrop}>
          <View style={styles.modalBackGround}>
            <View style={styles.modalHeader}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Season</Text>
              <Pressable onPress={() => closeModal()}>
                <Image source={require("../../assets/close.png")} />
              </Pressable>
            </View>
            <View style={{ padding: 10 }}>
              <View>
                {season.map((item) => {
                  return (
                    <Pressable onPress={() => setFilters(item)} key={item.id}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingBottom: 10,
                        }}
                      >
                        <Text>{item.name}</Text>
                        <View style={{ position: "relative" }}>
                          <View
                            style={{
                              backgroundColor: "#3b6926",
                              paddingVertical: 4,
                              paddingHorizontal: 8,
                              borderRadius: 8,
                            }}
                          >
                            <Text style={{ color: "white" }}>{item.icon}</Text>
                          </View>
                          {item.selected && <View style={styles.redDot} />}
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={styles.btnContainer}>
                  <CustomButton
                    title="Clear Filter"
                    pressAction={clearFilter}
                  />
                  <CustomButton
                    title="Apply Filter"
                    pressAction={applyFilter}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get("window").width * 0.84,
    borderRadius: 5,
    borderColor: "#d7d7d7",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    padding: 10,
    borderBottomColor: "#D7D7D7",
    backgroundColor: "white",
    alignItems: "center",
  },
  modalBackGround: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  backDrop: {
    backgroundColor: "rgba(51, 51, 51, 0.75)",
    flex: 1,
    justifyContent: "flex-end",
  },
  redDot: {
    backgroundColor: "red",
    height: 10,
    width: 10,
    position: "absolute",
    borderRadius: 10,
    right: 0,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
