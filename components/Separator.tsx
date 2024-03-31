import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const Separator = ({ label }: { label: string }) => {
  return (
    <View style={styles.separator}>
      <View
        style={{
          flex: 1,
          borderBottomColor: "#000",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text style={styles.separatorText}>Or</Text>
      <View
        style={{
          flex: 1,
          borderBottomColor: "#000",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 30,
  },
  separatorText: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
});
