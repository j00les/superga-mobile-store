import { MaterialIcons, Fontisto, Entypo } from '@expo/vector-icons';

import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { uris, WIDTH } from '../constants/constants';
import Card from '../components/Card';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY, GET_PRODUCTS } from '../queries';
import { useState } from 'react';
import { AllertaStencil_400Regular } from '@expo-google-fonts/allerta-stencil';
import { Aclonica_400Regular } from '@expo-google-fonts/aclonica';
import { useFonts } from 'expo-font';
import { changeColor } from '../helpers/helpers';

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const { loading: loadCat, error: errCat, data: categories } = useQuery(GET_CATEGORY);

  const [imageActive, setImageActive] = useState(0);

  const [fontsLoaded] = useFonts({
    Allerta: AllertaStencil_400Regular,
    Aclonica: Aclonica_400Regular,
  });

  if (error || errCat) {
    return (
      <View className="justify-center flex-1 items-center ">
        <Text className="text-2xl uppercase font-bold whitespace-normal">
          Can't fetch data, That's all we know!
        </Text>
      </View>
    );
  }

  const loadingIndicator = (
    <View className="justify-center h-full flex-2">
      <ActivityIndicator size="large" color="#594545" />
      <Text className="text-base text-center">Wait a sec...</Text>
    </View>
  );

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide !== imageActive) {
        setImageActive(slide);
      }
    }
  };

  return loading ? (
    loadingIndicator
  ) : (
    <>
      <SafeAreaView
        style={{
          backgroundColor: '#9E7676',
          flex: 0,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: '#9E7676',
            }}
            className="py-2  px-3 flex-row justify-between"
          >
            <View className="flex-row gap-1 pr-2">
              <MaterialIcons name="email" size={20} color="white" />
            </View>

            <View className="w-[120]">
              <Image
                className="w-full h-[20]"
                source={{ uri: uris.logoSource }}
                style={styles.logoImage}
              />
            </View>
            <View className="flex-row gap-1 pr-2">
              <Entypo name="shopping-bag" size={20} color="white" />
            </View>
          </View>
          <View style={styles.wrap}>
            <ScrollView
              key={'banner-home'}
              onScroll={({ nativeEvent }) => onchange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled={true}
            >
              {uris.homeBanner.map((el, i) => {
                return (
                  <Image
                    source={{ uri: el }}
                    resizeMode="stretch"
                    key={i + '))idid'}
                    style={styles.wrap}
                  />
                );
              })}
            </ScrollView>
            <View style={styles.wrapDot}>
              {uris.homeBanner.map((el, i) => (
                <Text
                  className="shadow-sm rounded-[20]"
                  style={imageActive === i ? styles.dotActive : styles.dot}
                  key={i + 'dott'}
                >
                  ●
                </Text>
              ))}
            </View>
          </View>
          <View className="justify-center mt-2 flex-row-reverse w-[350] self-center">
            <TextInput
              placeholder="Search our latest goods"
              className="border border-solid  p-2 rounded-lg w-[320] mx-auto items-end"
            ></TextInput>
          </View>

          <View className="items-center mt-2">
            <Text
              style={{ fontFamily: 'Allerta' }}
              className="text-center mt-1 mb-2 uppercase text-2xl"
            >
              Categories
            </Text>

            <FlatList
              horizontal
              data={categories.categories}
              renderItem={({ item }) => (
                <TouchableOpacity style={changeColor(item)} className="p-1.5  ml-3 rounded-md ">
                  <Text className="font-semibold text-white uppercase">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View>
            <Text style={{ fontFamily: 'Allerta' }} className="text-center mt-3 uppercase text-2xl">
              New Arrivals
            </Text>
          </View>
          <View className="p-3 mx-2 items-center ">
            <FlatList
              key={'_'}
              className="w-full"
              numColumns={2}
              data={data?.products}
              renderItem={({ item }) => <Card products={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bannerImage: { width: 400, height: 400 },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  wrap: {
    width: WIDTH,
    height: 400,
  },

  wrapDot: {
    position: 'absolute',
    top: 370,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  dotActive: {
    margin: 3,
    color: '#594545',
    fontSize: 10,
  },

  dot: {
    fontSize: 10,
    margin: 2,
    color: '#F4F0D8',
  },

  container: {
    flex: 1,
  },
});
