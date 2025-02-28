import { View, Text, StyleSheet, ViewStyle } from "react-native";
import React from "react";

interface propType {
  title: string; // Use lowercase 'string'
  stylepar: ViewStyle;
}

const Card: React.FC<propType> = ({ title, stylepar }) => {
  return (
    <View style={[styles.container, stylepar]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 60,
    width: 150,
  },
  text: {
    flex: 1,
    width: 100,
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Card; // Capitalize component name
