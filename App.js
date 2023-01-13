import StackNav from './route/StackNav';
import { StyleSheet } from 'react-native';
import { View, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#111"/>
      <StackNav />
    </View>

      
  );
}

const styles = StyleSheet.create(
  {
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#111',
    }
  }
)