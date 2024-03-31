import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const CustomButton = ({
  icon,
  iconSize = 24,
  text,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  text: string;
  onPress: any;
}) => {
  return (
    <TouchableOpacity style={defaultStyles.btnOutline} onPress={onPress}>
      <Ionicons name={icon} size={iconSize} style={defaultStyles.btnIcon} />
      <Text style={defaultStyles.btnOutlineText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
