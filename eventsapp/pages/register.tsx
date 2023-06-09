import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Register({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [token, setToken] = useState(null);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setIsEmailValid(true);
      setEmailErrorMessage(null);
    } else {
      setIsEmailValid(false);
      setEmailErrorMessage("Email is invalid");
    }
  };

  const validatePassword = (password) => {
    if (password.length >= 7) {
      setIsPasswordValid(true);
      setPasswordErrorMessage(null);
    } else {
      setIsPasswordValid(false);
      setPasswordErrorMessage("Password have at least 7 characters");
    }
  };

  const handleRegister = async () => {
    console.log("isEmailValid:", isEmailValid);
    console.log("isPasswordValid:", isPasswordValid);
    if (isEmailValid && isPasswordValid) {
      try {
        console.log("starte");
        setIsLoading(true);
        console.log("email:", email);
        console.log("password:", password);

        let ret = await fetch("http://10.0.2.2:9090/users/create", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((response: any) => {
            console.log(response);
            setToken(response.data);
            console.log("tokenSet");
          })
          .then(() => {
            Toast.show({
              type: "success",
              text1: "Succes",
              text2: "You have succesfully created an account👋",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error: any) {
        console.log("error");
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${error.message} `,
        });
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/registerImage.png")}
        />
        <View style={styles.formContainer}>
          <Text style={styles.textHeader}>Register</Text>

          <TextInput
            style={[
              styles.input,
              !isEmailValid && email.length > 0 && styles.invalidInput,
            ]}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailErrorMessage ? (
            <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
          ) : null}

          <TextInput
            style={[
              styles.input,
              !isPasswordValid && password.length > 0 && styles.invalidInput,
            ]}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}
            value={password}
            placeholder="password"
            secureTextEntry={true}
          />

          {passwordErrorMessage ? (
            <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
          ) : null}
          <TouchableOpacity onPress={() => alert("Forgot password?")}>
            <Text style={styles.textLink}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Sign up for an account.")}>
            <Text
              style={styles.textLink}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an account?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton]}
            onPress={handleRegister}
            disabled={!isEmailValid || !isPasswordValid || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.textButton}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    marginRight: "auto",
    marginLeft: 12,
  },
  textLink: {
    marginTop: 10,
    fontSize: 14,
    color: "#0080ff",
  },
  input: {
    height: 50,
    width: 300,
    margin: 10,
    marginBottom: 0,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    fontSize: 16,
  },
  invalidInput: {
    borderColor: "red",
  },
  image: {
    width: 270,
    height: 270,
  },
  loginButton: {
    color: "white",
    fontSize: 16,
    borderColor: "red",
    borderWidth: 2,
    padding: 7,
    paddingHorizontal: 56,
    textAlign: "center",
    backgroundColor: "indianred",
    borderRadius: 4,
    fontWeight: "bold",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    textAlign: "right",
    marginLeft: "auto",
  },
});
