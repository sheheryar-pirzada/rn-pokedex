import { CARD_WIDTH } from './index';

export const pokemonListProps = {
  windowSize: 4,
  bounces: false,
  horizontal: true,
  decelerationRate: 0,
  initialNumToRender: 4,
  maxToRenderPerBatch: 4,
  scrollEventThrottle: 16,
  snapToInterval: CARD_WIDTH,
  removeClippedSubviews: true,
  updateCellsBatchingPeriod: 100,
  showsHorizontalScrollIndicator: false,
};
