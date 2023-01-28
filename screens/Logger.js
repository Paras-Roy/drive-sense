import { Text, View, StyleSheet, TouchableOpacity, BackHandler} from "react-native";
import Header from "../components/header";
import { Accelerometer, Gyroscope } from 'expo-sensors'
import { useState, useEffect } from "react";
import * as FileSystem from 'expo-file-system';
// import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';


const Logger = ({ route, navigation }) => {

    const style = route.params.driveStyle
    //const style = 'Normal'
    //

    //Code to handle sensor data logging and saving to csvData string
        const [csvData, setCsvData] = useState("DateTime,AccX,AccY,AccZ,GyroX,GyroY,GyroZ,label\n")
        const [accSubscription, setAccSubscription] = useState(null)
        const [gyroSubscription, setGyroSubscription] = useState(null)
        const [isSubscribed, setIsSubscribed] = useState(true)

        const [{ x, y, z }, setAccData] = useState({
            x: 0,
            y: 0,
            z: 0,
        });

        const [{ gx, gy, gz }, setGyroData] = useState({
            gx: 0,
            gy: 0,
            gz: 0,
        });

        Accelerometer.setUpdateInterval(1000)
        Gyroscope.setUpdateInterval(1000)

        const subscribe = () => {
            setAccSubscription(
                Accelerometer.addListener(({ x, y, z }) => {
                    setAccData({ x, y, z });
                    setCsvData(prevData => prevData + `${Date()},${x},${y},${z},`);
                })
            )
            setGyroSubscription(
                Gyroscope.addListener(({ x: gx, y: gy, z: gz }) => {
                    setGyroData({ gx, gy, gz });
                    setCsvData(prevData => prevData + `${gx},${gy},${gz},${style}\n`);
                })
            )
        }

        const unsubscribe = () => {
            if(isSubscribed){
            accSubscription && accSubscription.remove()
            setAccSubscription(null)
            gyroSubscription && gyroSubscription.remove()
            setGyroSubscription(null)
                setIsSubscribed(false)  
            }
        }

        useEffect(() => {
            subscribe();
                return () => unsubscribe();
        }, []);

    //Code to disable accidental back button press
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])
    
    //Code for saving as CSV on submit
    const exportData = async() => {
        try {
            navigation.navigate('Home');
            const fileName = FileSystem.documentDirectory + route.params.name + "-" + style + "-data.csv";
            FileSystem.writeAsStringAsync(fileName, csvData, { encoding: FileSystem.EncodingType.UTF8 }).then(() => {
                Sharing.shareAsync(fileName);
            })
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              alert('User cancelled the picker')    
            } else {
              alert(err)
            }
          }
        
    }
    
    
    return (
        <View style={styles.wrapper}>
            <Header />

            <View style={styles.container}>
                <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>{route.params.name}</Text>
                        <Text style={styles.info}>{style} Drive</Text>
                </View>



                <View style={styles.dataContainer}>
                    <View style={styles.dataRow}>
                        <View style={styles.dataInfo}>
                            <Text style={styles.data}>{x.toFixed(3)}</Text>
                            <Text style={styles.dataLabel}>Acc X </Text>
                        </View>
                        <View style={styles.dataInfo}>
                            <Text style={styles.data}>{y.toFixed(3)}</Text>
                            <Text style={styles.dataLabel}>Acc Y </Text>
                        </View>
                        <View style={styles.dataInfo}>
                            <Text style={styles.data}>{z.toFixed(3)}</Text>
                            <Text style={styles.dataLabel}>Acc Z </Text>
                        </View>
                    </View>


                    <View style={styles.dataRow}>
                        <View style={styles.dataInfo}>
                            <Text style={styles.data}>{gx.toFixed(3)}</Text>
                            <Text style={styles.dataLabel}>Gyro X  </Text>
                        </View>
                        <View style={styles.dataInfo}>
                            <Text style={styles.data}>{gy.toFixed(3)}</Text>
                            <Text style={styles.dataLabel}>Gyro Y </Text>
                        </View>
                        <View style={styles.dataInfo}>
                            <Text style={styles.data}>{gz.toFixed(3)}</Text>
                            <Text style={styles.dataLabel}>Gyro Z </Text>
                        </View>
                    </View>

                </View>
                <TouchableOpacity
                    onPress={exportData}>
                    <Text style={styles.submit}>END DRIVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#111',
        flex: 1
    },
    container: {

        padding: 25,

    },
    infoContainer: {
        padding: 15,
        borderRadius: 20,
        justifyContent: 'space-between',
    },
    infoTitle: {
        fontSize: 45,
        color: 'white',
        flexWrap: 'wrap',
        flexShrink: 1,
        fontWeight: '400'
    },
    info: {
        fontSize: 30,
        color: 'white',
        flexWrap: 'wrap',
        flexShrink: 1,
        fontWeight: '300'
    },

    dataContainer: {
        marginVertical: 40,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(192,222,221,.13)',
        borderRadius: 20,

    },
    dataRow: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        borderRadius: 20,
        borderColor: 'rgba(192,222,221,0.23)',
        borderStyle: 'solid',
        borderWidth: 0.5,
    },
    dataInfo: {
        alignItems: 'center',
        borderRadius: 30,
        paddingVertical: 5,
        width: 75,

    },
    dataLabel: {
        fontSize: 16,
        color: '#bbb',
    },
    data: {
        fontSize: 25,
        color: '#fff',
        flexWrap: 'wrap',
        flexShrink: 1,
        fontWeight: '600'
    },
    submit: {
        backgroundColor: '#D13524',
        width: 150,
        textAlign:'center',
        alignSelf:'flex-end',
        textAlignVertical: "center",
        height: 50,
        color: '#eee',
        fontSize:25,
        borderRadius: 15,
        fontWeight: '600',
    }
})

export default Logger;