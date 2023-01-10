import { View, StyleSheet, Text } from "react-native";

export default function Header() {
    return (
        <View style = {styles.header}>
            <View style={styles.headerLeft}>
                <Text style={styles.headerText}>Drive-Sense</Text>
                <Text style = {styles.headerSubtext}>Log sensor data while driving</Text>
            </View>
            <View style = {styles.headerRight}>
                {/* logo, small logo */}
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        // backgroundColor: '#555',
        height: 200,
    },
    headerLeft: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 20
    },
    headerText: {
        fontSize: 45,
        color: 'white',
    },
    headerSubtext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#aaa',
        paddingLeft: 3
    },
    headerRight: {
        
    }

})
  