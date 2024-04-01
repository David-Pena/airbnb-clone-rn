import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import ListingsMap from "@/components/ListingsMap";
import ListingsData from "@/assets/data/airbnb-listings.json";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => ListingsData as Listing[], []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChanged} />,
        }}
      />
      <ListingsMap listings={ListingsData as any} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Page;
