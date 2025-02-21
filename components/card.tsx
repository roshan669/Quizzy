import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface propType {
  title: string; // Use lowercase 'string'
}

const Card: React.FC<propType> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // Example background color
    padding: 10, // Example padding
    borderRadius: 8, // Example border radius
    elevation: 2, // For Android shadow (elevation)
    shadowColor: "#000", // For iOS shadow (shadowColor, shadowOffset, shadowOpacity, shadowRadius)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10, // Space between cards
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    // Style the text within the card
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
});

export default Card; // Capitalize component name
