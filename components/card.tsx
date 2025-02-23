import { View, Text, StyleSheet, ViewStyle } from "react-native";
import React from "react";

interface propType {
  title: string; // Use lowercase 'string'
  stylepar: ViewStyle;
}

const Card: React.FC<propType> = ({ title, stylepar }) => {
  return (
    <View style={[styles.container, stylepar]}>
      <Text style={{ flex: 1, width: 100 }}>{title}</Text>
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
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default Card; // Capitalize component name
