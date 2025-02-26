import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePreferContext } from "@/context/usePerference";
import Icon from "@expo/vector-icons/MaterialIcons";

export default function Modal() {
  const { score } = usePreferContext();
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="celebration" />
      <Text style={styles.title}>Your Score:</Text>
      <Text style={styles.score}>{score}</Text>

      <TouchableOpacity style={styles.btn}>
        <Text>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {},
  title: {},
  score: {},
  btn: {},
});
