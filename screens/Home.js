import { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, PermissionsAndroid} from "react-native";
import Header from "../components/header";

const Home = ({ navigation }) => {

    const [name, setName] = useState("Guest")
    const [safe, setSafe] = useState(true)

    const onSubmit = async () => {
        try {
            let isPermissionExternalStorage = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            )

            if (!isPermissionExternalStorage)
            {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage permission needed',
                        buttonNeutral: 'Ask Me Later',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel'
                    },
                );
                if (granted != PermissionsAndroid.RESULTS.granted)
                {
                    alert('Storage permission Denied')
                }
                }
            navigation.navigate('Logger', { name: name, driveStyle: safe ? "Normal" : "Aggressive" })
        }
        catch (e)
        {
            // alert('Error while checking for storage permission')
            
            navigation.navigate('Logger', { name: name, driveStyle: safe ? "Normal" : "Aggressive" })
            return;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.wrapper}>
                <Header />
                <View style={styles.container}>
                    <View style={styles.banner}>
                        <Text style = {styles.bannerTitle}>Drive Sense</Text>
                        <Text style = {styles.bannerInfo}>Collect Driving Data</Text>
                    </View>
                    <Text style={styles.text}>Enter Driver's Name</Text>
                    <TextInput
                        placeholder="eg: Paras Roy"
                        placeholderTextColor='#777'
                        style={styles.textInput}
                        maxLength={40}
                        onChangeText={(data) => setName(data)} />
                    {/* <Text style={styles.text}>Choose Driving Style</Text> */}
                    <View style = {styles.drivingStyleContainer}>
                    {/* <Switch
                        trackColor={{ false: "#555", true: "#333" }}
                            thumbColor={safe ? "#292" : "#922"}
                            value={safe}
                            onValueChange={()=>setSafe(previousState => !previousState)}
                        /> */}
                        <TouchableOpacity
                            onPress={() => setSafe(true)
                            }>
                            <Text style={safe ? styles.drivingStyleTextActive : styles.drivingStyleText}>
                                Normal
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSafe(false)
                            }>
                            <Text style={safe ? styles.drivingStyleText : styles.drivingStyleTextActive}>
                                Aggressive
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={onSubmit}>
                        <Text style={styles.submitButton}>DRIVE</Text>
                    </TouchableOpacity>
                    {/* <Button title="Start Journey" onPress={ ()=>navigation.navigate('Logger', {name: name, driveStyle: safe?"Normal":"Aggressive"}) } /> */}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create(
    {
        wrapper: {
            flex: 1,
            backgroundColor: "#111",
            padding: 20
        },
        container: {
            padding: 30
        },

        banner:{
            marginVertical:60,
        },

        bannerTitle: {
            fontSize: 55,
            color: 'white',
            fontWeight:'300'
        },

        bannerInfo: {
            fontSize: 20,
            color: 'white',
            fontWeight:'300'
        },
        text: {
            // backgroundColor:"#efb",
            textAlignVertical: "bottom",
            marginLeft:5,
            height: 50,
            color: 'white',
            fontSize:25,
            borderRadius: 5,
            fontWeight:'400'
        },
        textInput: {
            marginTop:10,
            height: 50,
            paddingHorizontal: 20,
            color: 'black',
            fontSize: 20,
            fontWeight:'500',
            borderColor: '#555',
            backgroundColor:'#C0DEDD',
            borderRadius: 15,
            borderStyle: "solid",
            borderWidth:1
        },
        drivingStyleContainer: {
            backgroundColor: 'rgba(192,222,221,.23)',
            marginVertical: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 15,
        },
        drivingStyleText: {
            paddingHorizontal:30,
            textAlignVertical: "center",
            height: 50,
            color: '#eee',
            fontSize:20,
            borderRadius: 15,
        },
        drivingStyleTextActive:{
            backgroundColor: "rgba(230, 223, 241, 1)",
            paddingHorizontal:30,
            textAlignVertical:"center",
            height: 50,
            color: '#111',
            fontSize:20,
            borderRadius: 15,
            fontWeight:'600'
        },
        submitButton: {
            backgroundColor: '#D13524',
            width: 130,
            textAlign:'center',
            alignSelf:'flex-end',
            textAlignVertical: "center",
            height: 50,
            color: '#eee',
            fontSize:25,
            borderRadius: 15,
            fontWeight: '600'

        }
    }
)

export default Home;