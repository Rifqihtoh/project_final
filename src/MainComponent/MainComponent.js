import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Card } from "react-native-paper";
import { stylesMain } from './MainComponent.styles';
import { LinearGradient } from 'expo-linear-gradient';

const GameScreen = ({ navigation }) => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("fullName").then((name) => {
      if (name) {
        setFullName(name);
      }
    });
  }, []);

  const choices = [
    { name: "batu", image: require("../../assets/batu.png") },
    { name: "gunting", image: require("../../assets/gunting.png") },
    { name: "kertas", image: require("../../assets/kertas.png") },
  ];

  const handlePlayerChoice = (choice) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex].name;

    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    if (choice === computerChoice) {
      setResult("Draw!");
    } else if (
      (choice === "batu" && computerChoice === "gunting") ||
      (choice === "gunting" && computerChoice === "kertas") ||
      (choice === "kertas" && computerChoice === "batu")
    ) {
      setResult("You win!");
    } else {
      setResult("You lose!");
    }
  };

  const handleLogout = async () => {
    // Clear fullName from AsyncStorage upon logout
    await AsyncStorage.removeItem("fullName");

    // Navigate back to the Login screen
    navigation.replace("Login");
  };

  return (
    <View style={stylesMain.container}>
      <Text style={stylesMain.fullName}>Hallo, {fullName}</Text>
      <Text style={stylesMain.textKalimat}>Mari Bermain, Kalahkan lawanmu !!!</Text>
      <Text style={stylesMain.title}>Batu Gunting Kertas</Text>
      <View style={stylesMain.choicesContainer}>
        {choices.map((choice) => (
          <TouchableOpacity key={choice.name} onPress={() => handlePlayerChoice(choice.name)}>
            <Card style={stylesMain.choiceCard}>
              <Card.Cover source={choice.image} style={stylesMain.choiceImage} />
            </Card>
          </TouchableOpacity>
        ))}
      </View>
      <View style={stylesMain.resultContainer}>
        {playerChoice && computerChoice && (
          <View>
            <Text style={stylesMain.resultText}>Your choice: {playerChoice}</Text>
            <Text style={stylesMain.resultText}>
              Computer's choice: {computerChoice}
            </Text>
            <Text style={stylesMain.resultText}>{result}</Text>
          </View>
        )}
      </View>
      {/* <Button title="Logout" onPress={handleLogout} /> */}
      
      <TouchableOpacity onPress={handleLogout} style={stylesMain.button}>
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']} // Warna gradient sesuaikan dengan tema hijau army yang diinginkan
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={stylesMain.gradient}
        >
          <Text style={stylesMain.buttonText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
      
    </View>
  );
};

export default GameScreen;
