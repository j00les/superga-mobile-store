import { useState } from 'react';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { WIDTH } from '../constants/constants';
import { changeColor, toRupiah } from '../helpers/helpers';
import { TouchableOpacity, Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_DETAIL } from '../queries';
import { ActivityIndicator } from 'react-native-paper';
import { AllertaStencil_400Regular } from '@expo-google-fonts/allerta-stencil';

export default function DetailScreen({ route, navigation }) {
  const [imageActive, setImageActive] = useState(0);

  const { id } = route.params;

  const { loading, error, data } = useQuery(GET_DETAIL, { variables: { id } });
  const [isModalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    Allerta: AllertaStencil_400Regular,
  });

  if (error) {
    return (
      <View>
        <Text>Can't fetch data. that's all we know</Text>
      </View>
    );
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const loadingIndicator = (
    <>
      <View className="justify-center h-full flex-2">
        <ActivityIndicator size="large" color="#594545" />
        <Text className="text-base text-center">Wait a sec...</Text>
      </View>
    </>
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
      <View className="flex-3">
        <View style={styles.wrap} className="h-[350]">
          <ScrollView
            key={'image-key'}
            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={true}
          >
            {data?.product?.Images?.map((el, i) => {
              return (
                <Image
                  source={{ uri: el.imgUrl }}
                  resizeMode="cover"
                  key={el.id}
                  style={styles.wrap}
                />
              );
            })}
          </ScrollView>

          <TouchableOpacity
            className="absolute left-4 top-11"
            onPress={() => navigation.navigate('Home')}
          >
            <Text className="text-lg underline text-blue-500 font-semibold" name="arrowleft">
              Go Back
            </Text>
          </TouchableOpacity>

          {/* dot */}
          <View style={styles.wrapDot}>
            {data?.product?.Images.map((el, i) => (
              <Text
                className="shadow-sm rounded-[20]"
                style={imageActive === i ? styles.dotActive : styles.dot}
                key={el.id + ' dot'}
              >
                ●
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View className="flex-2 p-3">
        <View>
          <View className="flex-row items-center pr-7">
            <Text style={{ color: '#594545' }} className="text-2xl mt-4 font-semibold">
              {data?.product?.name}
            </Text>
            {console.log(data.product.Category.name)}
            <TouchableOpacity
              style={changeColor(data.product.Category.name)}
              className="p-1.5 mt-4 ml-auto rounded-md"
            >
              <Text className="font-semibold text-white uppercase">
                {data.product.Category.name}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <Text className="text-xl">{toRupiah(data?.product?.price)}</Text>

            <Text className="text-base mt-2">
              {data?.product?.description.slice(0, data?.product?.description.length - 150)}
              <TouchableOpacity>
                <Text className="text-blue-500 font-bold text-base" onPress={toggleModal}>
                  ...See Detail
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>

      {/* bawah desc */}
      <View className="flex-1 pl-2">
        <View className="flex-2 flex-row p-2 w-1/2 items-center gap-1">
          <View className="border flex-1 border-solid py-1 px-1">
            <Text className="text-center text-lg">36</Text>
          </View>
          <View className="border flex-1 border-solid py-1 px-1">
            <Text className="text-center text-lg">42</Text>
          </View>
          <View className="border flex-1 border-solid py-1 px-1">
            <Text className="text-center text-lg">45</Text>
          </View>
          <View className="border flex-1 border-solid py-1 px-1">
            <Text className="text-center text-lg">41</Text>
          </View>
        </View>

        <View className="pl-2">
          <View id="author">
            <Text
              style={{ color: '#ED5406', fontFamily: 'Allerta' }}
              className="font-semibold  text-lg"
            >
              Author:
            </Text>

            <Text className="italic text-base">{data.product.User.username}</Text>
            <Text className="italic text-base">{data.product.User.email}</Text>
          </View>
        </View>

        <Modal
          style={{
            borderColor: '#594545',
          }}
          className="bg-slate-50 border-2 rounded-md p-2 shadow-md"
          isVisible={isModalVisible}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['up', 'left', 'right', 'down']}
          coverScreen={false}
          hasBackdrop={false}
        >
          <View
            style={{
              borderColor: '#594545',
              flex: 1,
            }}
            className="border-2 px-1 rounded-md justify-center items-center flex-row"
          >
            <Text className="text-lg">{data?.product?.description}</Text>
          </View>
        </Modal>

        <View className="px-4 mt-3">
          <View
            className="h-[50] items-center"
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              className="rounded-md  p-2 h-full justify-center border-2 mb-auto"
              style={{
                borderColor: '#594545',
                backgroundColor: '#9E7676',
                height: '100%',
              }}
            >
              <MaterialIcons color={'white'} name="favorite-outline" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: '#594545',
                backgroundColor: '#9E7676',
                flex: 4,
                height: '100%',
              }}
              className=" rounded-md items-center ml-2 border-2  justify-center"
            >
              <Text className="uppercase font-semibold text-xl text-slate-100">Buy now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: WIDTH,
    height: 420,
  },

  wrapDot: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  dotActive: {
    margin: 2,
    color: 'gray',
    fontSize: 10,
  },

  dot: {
    margin: 2,
    color: '#F4F0D8',
    fontSize: 10,
  },

  container: {
    flex: 1,
  },
});
