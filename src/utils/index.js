import { StyleSheet, Dimensions } from 'react-native';

export const WD = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const ct = (...styles) => {
  return StyleSheet.flatten(styles);
};

export const getDWSprite = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const getGif = (name) => {
  return `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${name}.gif`;
};

export const decimeterToFeet = (decimeter) => {
  return (decimeter * 0.328084).toFixed(1);
};

export const hectogramsToKilograms = (hectograms) => {
  return (hectograms / 10).toFixed(1);
};

export const getOtherSprites = (sprites, otherKey) => {
  const _sprites = [];
  if (Object.keys(sprites.other[otherKey]).length > 0) {
    for (const key in sprites.other[otherKey]) {
      if (typeof sprites.other[otherKey][key] === 'string') {
        _sprites.push(sprites.other[otherKey][key]);
      }
    }
  }
  return _sprites;
};

// Pokemon List related constants and utils

export const CARD_HEIGHT = 350;
export const BACKDROP_WIDTH = WD.width;
export const BACKDROP_HEIGHT = WD.height;
export const CARD_WIDTH = WD.width * 0.72;
export const SPACER_SIZE = (WD.width - CARD_WIDTH) / 2;

export const getSpacedListItems = (data) => {
  return [{ name: 'left-space' }, ...data, { name: 'right-space' }];
};
