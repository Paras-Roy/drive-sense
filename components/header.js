import { View, StyleSheet, Text } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {
    return (
        <View style = {styles.header}>
            <View style={styles.headerLeft}>
                <AntDesign name="github" size={30} color="white" />                
            </View>
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
  