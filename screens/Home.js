import { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Switch, Button } from "react-native";
import Header from "../components/header";

const Home = ({ navigation }) => {

    const [name, setName] = useState("Guest")
    const [safe, setSafe] = useState(true)

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.wrapper}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.text}>Enter Name</Text>
                    <TextInput
                        placeholder="eg: Paras Roy (max 20 char)"
                        placeholderTextColor='#888'
                        style={styles.textInput}
                        maxLength={40}
                        onChangeText={(data) => setName(data)} />
                    <Text style={styles.text}>Choose Driving Style</Text>
                    <View style = {styles.drivingStyleContainer}>
                        <Text style={styles.drivingStyleText}>Aggressive</Text>
                    <Switch
                        trackColor={{ false: "#555", true: "#333" }}
                            thumbColor={safe ? "#292" : "#922"}
                            value={safe}
                            onValueChange={()=>setSafe(previousState => !previousState)}
                        />
                        <Text style={styles.drivingStyleText}>Non - Aggressive</Text>
                    </View>
                    <Button title="Start Journey" onPress={ ()=>navigation.navigate('Logger', {name: name, driveStyle: safe?"Normal":"Aggresive"}) } />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create(
    {
        wrapper: {
            flex: 1,
            backgroundColor: "#222"
        },
        container: {
            padding: 30,
        },
        text: {
            marginTop: 30,
            // backgroundColor:"#efb",
            textAlignVertical:"bottom",
            height: 50,
            color: 'white',
            fontSize:20,
            borderRadius: 5,
        },
        textInput: {
            marginTop:20,
            height: 50,
            paddingLeft:20,
            color: 'white',
            fontSize:20,
            borderColor: '#555',
            backgroundColor:'#222',
            borderRadius: 5,
            borderStyle: "solid",
            borderWidth:1
        },
        drivingStyleContainer: {
            marginTop: 10,
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        drivingStyleText:{
            marginTop: 30,
            // backgroundColor:"#efb",
            textAlignVertical:"top",
            height: 50,
            color: '#999',
            fontSize:20,
            borderRadius: 5,
        }
    }
)

export default Home;