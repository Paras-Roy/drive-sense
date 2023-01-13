import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {
    const githubURL = "https://www.github.com/paras-roy/drive-sense"

    const gotoURL = () => {
        Linking.canOpenURL(githubURL).then(supported => {
          if (supported) {
            Linking.openURL(githubURL);
          } else {
            console.log("Don't know how to open URI: " + githubURL);
          }
        });
      };

    return (
        <View style = {styles.header}>
            <TouchableOpacity style={styles.headerLeft} onPress={gotoURL}>
                <AntDesign name="github" size={30} color="white" />                
            </TouchableOpacity>
            <View style = {styles.headerRight}>
                <MaterialCommunityIcons name="steering" size={40} color="white" />
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        // backgroundColor: '#555',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30
    },
    headerLeft: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    headerRight: {
        
    }

})
  