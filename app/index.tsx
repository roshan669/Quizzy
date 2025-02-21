import React, { useState, useRef, useEffect } from "react";
import { usePreferContext } from "../context/usePerference";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated, // Import Animated
} from "react-native";
import { categories } from "@/constants/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@/components/card";

import Icon from "@expo/vector-icons/MaterialIcons";
import { url } from "@/constants/Url";

const MyComponent: React.FC = () => {
  const { setData, data } = usePreferContext();
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [category, setCategory] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
      let apiUrl = `${url}difficulty=${difficulty}&type=multiple`;
      if (category !== 0) {
        apiUrl += `&category=${category}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      setData((prevData) => result.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
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
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  marginTop: 50,
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
                <Text style={{ fontWeight: "semibold", fontSize: 15 }}>
                  Next
                </Text>
                <Icon name="navigate-next" size={23}></Icon>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>

        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => {
              setCategory(parseInt(category.id));
              setModalVisible(true);
              animateBackdrop(true);
              animateModal(true);
            }}
          >
            <Card title={category.name} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
});

export default MyComponent;
