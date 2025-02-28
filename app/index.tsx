import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useVideoPlayer, VideoView, VideoSource } from "expo-video";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Redirect } from "expo-router";
import { useRouter } from "expo-router";
const assetId = require("../assets/start.mp4");

export default function index() {
  const router = useRouter();
  const videoSource: VideoSource = {
    assetId,
    metadata: {
      title: "startscr",
      artist: "roshan",
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const handlePress = async () => {
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.video}
          player={player}
          contentFit={"cover"} // Or "contain", "stretch" as needed
          nativeControls={false}
        />
        <View style={styles.overlay}>
          <Icon name="lightbulb-on-outline" size={50} />
          <Text style={styles.overlayText}>Quizzy</Text>
          <Text></Text>
        </View>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.overlay, { top: 530, left: 0, right: 0, bottom: 0 }]}
        >
          <Text style={styles.button}>Play</Text>
        </TouchableOpacity>
        <Link
          style={[styles.overlay, { top: 730, left: 0, right: 0, bottom: 0 }]}
          href={"https://github.com/roshan669"}
        >
          <Text
            style={{ textAlign: "center", fontFamily: "my-font", fontSize: 20 }}
          >
            <Icon name="github" size={20} />
            Roshan
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  loadingContainer: {
    // Style for the loading indicator
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    width: 350,
    height: 800, // Or whatever height you want
  },
  video: {
    flex: 1, // Important: Video should take up the full container
    marginBottom: 100,
  },
  overlay: {
    position: "absolute", // Key for overlay
    top: 0,
    left: 0,
    right: 0,
    bottom: 400,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  overlayText: {
    fontSize: 50,
    fontFamily: "my-font",
  },
  button: {
    backgroundColor: "#001111",
    color: "#FFF",
    padding: 10,
    borderRadius: 20,
    width: 125,
    textAlign: "center",
    elevation: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
});
