import React, { useState, useRef } from "react";
import { usePreferContext } from "@/context/usePerference";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  ActivityIndicator,
  ToastAndroid, // Import Animated
} from "react-native";
import { categories } from "@/constants/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@/components/card";

import Icon from "@expo/vector-icons/MaterialIcons";
import { url } from "@/constants/Url";
import { router } from "expo-router";
import he from "he";

const MyComponent: React.FC = () => {
  const { setData } = usePreferContext();
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [category, setCategory] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const backdropOpacity = useRef(new Animated.Value(0)).current; // For smooth transitions
  const modalScale = useRef(new Animated.Value(0)).current; // For scaling modal

  const animateBackdrop = (visible: boolean) => {
    Animated.timing(backdropOpacity, {
      toValue: visible ? 1 : 0,
      duration: 1, // Adjust duration as needed
      useNativeDriver: true, // For better performance
    }).start();
  };

  const animateModal = (visible: boolean) => {
    Animated.spring(modalScale, {
      toValue: visible ? 1 : 0, // 0 for hidden, 1 for visible
      useNativeDriver: true,
      bounciness: 5, // Adjust bounce effect
      speed: 5,
    }).start();
  };

  const handleFetchQuestions = async () => {
    try {
      setLoading(true);
      let apiUrl = `${url}difficulty=${difficulty}&type=multiple`;
      if (category !== 0) {
        apiUrl += `&category=${category}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      setData(result.results);
      setModalVisible(!modalVisible);
      setLoading(false);
      router.push("/qna");
    } catch (error) {
      ToastAndroid.show("error fetching questions", 10);
      console.error("Error fetching questions", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.background}>
      <Modal
        animationType="none" // Disable default animation
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          animateBackdrop(false);
          animateModal(false);
        }}
        transparent={true}
      >
        <View style={styles.modalBackdrop}>
          <Animated.View style={{ opacity: backdropOpacity }} />

          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: modalScale }] },
            ]}
          >
            <TouchableOpacity
              style={styles.close}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="close" size={32} />
            </TouchableOpacity>

            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Choose Difficulty
            </Text>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={[
                  styles.modalbutton,

                  difficulty == "easy" && {
                    elevation: 10,
                  },
                ]}
                onPress={() => setDifficulty("easy")}
              >
                <Text>Easy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalbutton,

                  difficulty == "medium" && {
                    elevation: 10,
                  },
                ]}
                onPress={() => setDifficulty("medium")}
              >
                <Text>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalbutton,

                  difficulty == "hard" && {
                    elevation: 10,
                  },
                ]}
                onPress={() => {
                  setDifficulty("hard");
                }}
              >
                <Text>Hard</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.modalbutton,
                {
                  marginBottom: 30,

                  width: 100,
                  gap: 2,
                  elevation: 10,
                },
              ]}
              onPress={handleFetchQuestions}
            >
              {loading ? (
                <ActivityIndicator color={"#000"} />
              ) : (
                <Icon name="navigate-next" size={30}></Icon>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      <ScrollView>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
            marginTop: 50,
            marginBottom: 10,
          }}
        >
          Choose a Category
        </Text>
        <View style={styles.cardContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              style={styles.cardWrapper}
              key={category.id}
              onPress={() => {
                setCategory(parseInt(category.id));
                setModalVisible(true);
                animateBackdrop(true);
                animateModal(true);
              }}
            >
              <Card
                stylepar={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  height: 80,
                  elevation: 5,
                  borderRadius: 10,
                }}
                title={category.name}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  close: {
    margin: 25,
  },
  modalBackdrop: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flexDirection: "column",
    backgroundColor: "#d1d1d1",
    borderRadius: 10,
    width: "85%",
    transform: [{ scale: 0 }], // Initial scale for animation
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  modalContent: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  modalbutton: {
    backgroundColor: "#d5d5d5",
    flexDirection: "row",
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 12,
  },
  cardContainer: {
    // Styles for the container of the cards
    flexDirection: "row",
    flexWrap: "wrap", // Allows cards to wrap to the next line
    justifyContent: "center", // Distribute space around the cards
    padding: 10, // Add some padding around the cards
  },
  cardWrapper: {
    marginRight: 10,
    // Styles for the TouchableOpacity
    // width: "50%", // Roughly half the screen width, adjust as needed
    marginBottom: 10, // Add spacing between cards
  },
});

export default MyComponent;
