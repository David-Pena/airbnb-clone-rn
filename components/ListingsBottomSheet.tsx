import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Category } from "@/constants/Dummy";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Listings from "@/components/Listings";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  listings: Listing[];
  category: Category["name"];
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [refresh, setRefresh] = useState(0);

  const snapPoints = useMemo(() => ["10%", "100%"], []);

  const showMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <BottomSheetView style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Listings listings={listings} category={category} refresh={refresh} />
          <View style={styles.absoluteBtn}>
            <TouchableOpacity onPress={showMap} style={styles.btn}>
              <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>Map</Text>
              <Ionicons name="map" size={20} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 30,
  },
  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
