export function toRupiah(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);
}

export function changeColor(item) {
  // console.log(item.name);
  if (item.name === 'men' || item === 'men') {
    return {
      backgroundColor: '#3C76C9',
    };
  } else if (item.name === 'women' || item === 'women' || item.name === 'woman') {
    return {
      backgroundColor: '#9E0000',
    };
  } else if (item.name === 'kids' || item === 'kids') {
    return {
      backgroundColor: '#6CB4A8',
    };
  }
}
