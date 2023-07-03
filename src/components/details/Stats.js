import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { useMemo } from 'react';
import { StatBar } from './StatBar';
import { styles } from '../../styles/styles';

function Stats({ stats = [] }) {
  const sortedStats = useMemo(() => stats?.sort(
    (a, b) => a.base_stat - b.base_stat,
  ), [stats]);

  return (
    <Animated.View
      layout={Layout}
      style={styles.statsContainer}
      entering={FadeInDown.delay(2000).duration(1000).springify()}
    >
      {sortedStats?.map(({ base_stat, stat }, index) => (
        <StatBar
          key={stat.name}
          stat={stat.name}
          value={base_stat}
          delay={1500 + (index * 250)}
        />
      ))}
    </Animated.View>
  );
}

export default Stats;
