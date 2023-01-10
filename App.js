import { StyleSheet, View, Keyboard} from 'react-native';
import StackNav from './route/StackNav';

export default function App() {
  return (
      <StackNav/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 10,
    backgroundColor: '#222'
  }
});
