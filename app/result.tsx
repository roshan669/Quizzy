import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { usePreferContext } from "@/context/usePerference";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RouteConfigProps } from "@react-navigation/native";

export default function Modal() {
  const { score, setScore } = usePreferContext();
  const { setData, url } = usePreferContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        ToastAndroid.show(`something went wrong, please try again`, 10);
        setLoading(false);

        return;
      }
      const result = await response.json();

      if (result.response_code) {
        ToastAndroid.show("something went wrong !!!", 10);
        setLoading(false);

        return;
      }
      setData(result.results);

      setLoading(false);
      router.replace("/qna");
    } catch (error) {
      ToastAndroid.show(
        "error fetching questions, check your internet connection",
        10
      );
      setLoading(false);
    }
  };

  const handleHomebtn = () => {
    router.replace("/home");
  };
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="celebration" size={50} />
      <Text style={styles.title}>Your Score:</Text>
      <Text style={styles.score}>{score}</Text>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleFetchQuestions} style={styles.btn}>
          {loading ? (
            <ActivityIndicator color={"#000"} />
          ) : (
            <Icon name="replay-circle-filled" size={25} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleHomebtn} style={styles.btn}>
          <Icon name="home-filled" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    // margin: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  score: {
    height: 50,
    fontSize: 40,
    fontWeight: "500",
    margin: 10,
  },

  btn: {
    backgroundColor: "#d4d4d4",
    width: 150,
    height: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 50,
    flexDirection: "row",
    gap: 3,
    elevation: 10,
  },
  btnContainer: {
    flexDirection: "row-reverse",
    gap: 15,
    margin: 10,
  },
});
