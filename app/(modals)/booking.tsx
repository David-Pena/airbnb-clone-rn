import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, FadeOut, SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";
import DatePicker from "react-native-modern-datepicker";
import { guests } from "@/constants/Dummy";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Booking = () => {
  const router = useRouter();

  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guests);

  const today = new Date().toISOString().substring(0, 10);

  const onClearAll = () => {
    setOpenCard(0);
    setSelectedPlace(0);
    setGroups(guests);
  };

  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* Where */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Where to?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons name="search" size={20} style={styles.searchIcon} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destination"
                  placeholderTextColor={Colors.grey}
                />
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 25 }}
              >
                {places &&
                  places.map((item, idx) => (
                    <TouchableOpacity key={idx} onPress={() => setSelectedPlace(idx)}>
                      <Image
                        source={item.img}
                        style={selectedPlace === idx ? styles.placeSelected : styles.place}
                      />
                      <Text
                        style={[
                          styles.imgText,
                          { fontFamily: selectedPlace === idx ? "mon-sb" : "mon" },
                        ]}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </Animated.View>
          </>
        )}
      </View>

      {/* When */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              When's your trip?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <DatePicker
                current={today}
                selected={today}
                mode={"calendar"}
                options={{
                  defaultFont: "mon",
                  headerFont: "mon-sb",
                  borderColor: "transparent",
                  mainColor: Colors.primary,
                }}
              />
            </Animated.View>
          </>
        )}
      </View>

      {/* Who */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 2 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Who's coming?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              {groups.map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.guestItem,
                    idx + 1 < guests.length ? styles.itemBorder : null,
                  ]}
                >
                  <View>
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>{item.name}</Text>
                    <Text style={{ fontFamily: "mon", fontSize: 14, color: Colors.grey }}>
                      {item.text}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[idx].count =
                          newGroups[idx].count > 0 ? newGroups[idx].count - 1 : 0;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={26}
                        color={groups[idx].count > 0 ? Colors.grey : "#cdcdcd"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: "mon",
                        fontSize: 16,
                        minWidth: 18,
                        textAlign: "center",
                      }}
                    >
                      {item.count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[idx].count++;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons name="add-circle-outline" size={26} color={Colors.grey} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>

      {/* Footer */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onClearAll} style={{ justifyContent: "center" }}>
            <Text
              style={{ fontSize: 18, fontFamily: "mon-sb", textDecorationLine: "underline" }}
            >
              Clear All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={"#fff"}
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  previewText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.dark,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mon-b",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    backgroundColor: "#fff",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  placeSelected: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  imgText: {
    paddingTop: 6,
    textAlign: "center",
  },
  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});
