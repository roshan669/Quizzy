import { StyleSheet, Text, ToastAndroid, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { usePreferContext } from "@/context/usePerference";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function qna() {
  const { data, setScore } = usePreferContext();
  const [currQ, setCurrQ] = useState(0);
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<boolean>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [correctAns, setCorrectAns] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (data && data.length > 0) {
      shuffleAnswers();
      setQuestion(
        data[currQ].question
          .replaceAll(/&quot;/g, '"')
          .replaceAll(/&#039;/g, "'")
          .replaceAll(/&amp;/g, "&")
      );
    }
    setCorrectAns(
      data[currQ].correct_answer
        .replaceAll(/&quot;/g, '"')
        .replaceAll(/&#039;/g, "'")
        .replaceAll(/&amp;/g, "&")
    );
  }, [currQ]); // Shuffle when data changes or current question changes

  const shuffleAnswers = () => {
    if (data && data.length > 0 && data[currQ]) {
      const currentQuestion = data[currQ];
      const allAnswers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ].map((answer) =>
        answer
          .replaceAll(/&#039;/g, "'")
          .replaceAll(/&amp;/g, "&")
          .replaceAll(/&quot;/g, '"')
      );

      // Fisher-Yates shuffle algorithm for randomizing array elements
      for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }
      setAnswers(allAnswers);
    }
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (selected) return;
    setSelectedAnswer(selectedAnswer);
    setSelected(true);
    if (selectedAnswer !== correctAns) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (!selected) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      ToastAndroid.show("Please select an answer", 10);
      return;
    }

    if (currQ < data.length - 1) {
      setSelected(false);
      setCurrQ(currQ + 1);
      return;
    }

    router.replace("/result");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Question}>
        {currQ + 1}. {question}
      </Text>
      <TouchableOpacity
        style={[
          styles.answer,

          selected && answers[0] === correctAns
            ? { backgroundColor: "green" }
            : {},
          selected && answers[0] !== correctAns && selectedAnswer === answers[0]
            ? { backgroundColor: "red" }
            : {},
        ]}
        onPress={() => handleAnswer(answers[0])}
        disabled={selected ? true : false}
      >
        <Text style={styles.anstxt}>a. {answers[0]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.answer,

          selected && answers[1] === correctAns
            ? { backgroundColor: "green" }
            : {},
          selected && answers[1] !== correctAns && selectedAnswer === answers[1]
            ? { backgroundColor: "red" }
            : {},
        ]}
        onPress={() => handleAnswer(answers[1])}
        disabled={selected ? true : false}
      >
        <Text style={styles.anstxt}>b. {answers[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.answer,

          selected && answers[2] === correctAns
            ? { backgroundColor: "green" }
            : {},
          selected && answers[2] !== correctAns && selectedAnswer === answers[2]
            ? { backgroundColor: "red" }
            : {},
        ]}
        onPress={() => handleAnswer(answers[2])}
        disabled={selected ? true : false}
      >
        <Text style={styles.anstxt}>c. {answers[2]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.answer,

          selected && answers[3] === correctAns
            ? { backgroundColor: "green" }
            : {},
          selected && answers[3] !== correctAns && selectedAnswer === answers[3]
            ? { backgroundColor: "red" }
            : {},
        ]}
        onPress={() => handleAnswer(answers[3])}
        disabled={selected ? true : false}
      >
        <Text style={styles.anstxt}>d. {answers[3]}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNext} style={styles.nextbtn}>
        <Icons name="navigate-next" size={35} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  Question: {
    fontSize: 20,
    textAlign: "left",
    margin: 10,
    marginTop: 50,
    marginBottom: 30,
    textAlignVertical: "center",
    height: 130,
    width: 300,
    fontWeight: "bold",
  },
  answer: {
    margin: 10,
    backgroundColor: "#d4d4d4",
    width: 300,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    overflow: "hidden",
    padding: 20,
    elevation: 10,
  },
  nextbtn: {
    backgroundColor: "#d9d9d9",
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: 40,
    elevation: 10,
  },
  anstxt: {
    fontSize: 15,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "400",
  },
});
