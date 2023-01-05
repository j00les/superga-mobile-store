import { useNavigation } from "@react-navigation/core";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { toRupiah } from "../helpers/helpers";

export default function Card({ products }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="mt-2 mx-2 w-[155] shadow-lg"
      onPress={() => {
        navigation.navigate("Details", {
          id: products.id,
        });
      }}
    >
      <Image
        className="rounded-md w-[150] mx-auto h-[150]"
        source={{ uri: products?.mainImg }}
      ></Image>
      <View>
        <Text
          style={{ color: "#594545" }}
          className="font-semibold px-2 text-center mt-2 text-base"
        >
          {products.name}
        </Text>
        <Text className="text-center mt-1 text-sm">
          {toRupiah(products.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
