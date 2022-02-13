import React, { useCallback, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Animated, {
  FlipOutXUp,
  Layout,
  SlideInDown,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const LIST_ITEM_COLOR = "#7217de";

interface Item {
  id: number;
}

export default function App() {
  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({ id: index }))
  );

  const onAdd = useCallback(() => {
    setItems((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, { id: nextItemId }];
    });
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  }, []);

  const handlePress = () => {
    Alert.alert("Layout Animation", "Loading");
  };

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.menu}
        onPress={handlePress}
        name="ios-menu"
        size={30}
        color="black"
      />
      <Text style={styles.text}>Layout Animation</Text>

      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <AntDesign name="pluscircle" size={70} color="black" />
      </TouchableOpacity>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {items.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              entering={
                initialMode.current
                  ? SlideInDown.delay(100 * index)
                  : SlideInDown
              }
              exiting={FlipOutXUp}
              layout={Layout.delay(1)}
              onTouchEnd={() => onDelete(item.id)}
              style={styles.listItem}
            />
          );
        })}
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  menu: {
    paddingTop: 28,
    alignSelf: "flex-end",
    paddingRight: 20,
  },

  text: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },

  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: "90%",
    marginVertical: 16,
    borderRadius: 12,
    alignSelf: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: "#DCDCDC",
    borderRadius: 40,
    position: "absolute",
    bottom: 50,
    right: "5%",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
