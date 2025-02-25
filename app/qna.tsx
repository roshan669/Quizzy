import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { usePreferContext } from "@/context/usePerference";
import * as Haptics from "expo-haptics";

export default function qna() {
  const { data } = usePreferContext();
  const [currQ, setCurrQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  console.log(data);

  useEffect(() => {
    if (data && data.length > 0) {
      shuffleAnswers();
    }
  }, [currQ]); // Shuffle when data changes or current question changes

  const shuffleAnswers = () => {
    if (data && data.length > 0 && data[currQ]) {
      const currentQuestion = data[currQ];
      const allAnswers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      // Fisher-Yates shuffle algorithm for randomizing array elements
      for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }
      setAnswers(allAnswers);
    }
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (selected) return; // Prevent multiple answers once selected

    setSelected(true); // Mark that an answer has been selected

    const currentQuestion = data[currQ];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (!isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setIncorrect(!incorrect);
      setSelected(false);
      return;
    }

    setTimeout(() => {
      setSelected(false); // Reset for the next question
      if (currQ < data.length - 1) {
        setCurrQ(currQ + 1);
      } else {
        console.log("Quiz Finished!");
        // You might want to navigate to a results screen here
      }
    }, 500); // Delay before moving to the next question
  };
  return (
    <View style={styles.container}>
      <Text style={styles.Question}>{data[currQ].question}</Text>
      <TouchableOpacity onPress={() => handleAnswer(answers[0])}>
        <Text>{answers[0]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswer(answers[1])}>
        <Text>{answers[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswer(answers[2])}>
        <Text>{answers[2]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswer(answers[3])}>
        <Text>{answers[3]}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Question: {
    fontSize: 20,
    textAlign: "center",
  },
});
