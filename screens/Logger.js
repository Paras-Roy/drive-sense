import { Text, View, StyleSheet, Button } from "react-native";
import Header from "../components/header";
import {Accelerometer, Gyroscope} from 'expo-sensors'
import { useState, useEffect } from "react";

const Logger = ({ route, navigation }) => {

    const [csvData, setCsvData] = useState("x,y,z,label\n")
    const [currentValue, setCurrentValue] = useState([0, 0, 0])
    const [subscription, setSubscription] = useState(null)

    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });

    Accelerometer.setUpdateInterval(1000)

    const _subscribe = () => {
        setSubscription(
          Accelerometer.addListener(setData)
        )
    }
    
    const _unsubscribe = () => {
        subscription && subscription.remove()
        setSubscription(null)
    }
    
    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
      }, []);


    return (
        <View style={styles.wrapper}>
            <Header />

            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Driver Name: </Text>
                        <Text style={styles.info}>{route.params.name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Driving Style: </Text>
                        <Text style={styles.info}>{route.params.driveStyle}</Text>
                    </View>
                </View>



                <View style={styles.dataContainer}>

                    <View style={styles.dataRow}>
                        <View style={styles.dataInfo}>
                            <Text style={styles.dataLabel}>Acc X: </Text>
                            <Text style={styles.data}>{x.toFixed(4)}</Text>
                        </View>
                        <View style={styles.dataInfo}>
                            <Text style={styles.dataLabel}>Acc Y: </Text>
                            <Text style={styles.data}>{y.toFixed(4)}</Text>
                        </View>
                        <View style={styles.dataInfo}>
                            <Text style={styles.dataLabel}>Acc Z: </Text>
                            <Text style={styles.data}>{z.toFixed(4)}</Text>
                        </View>
                    </View>


                    <View style={styles.dataRow}>
                        <View style={styles.dataInfo}>
                            <Text style={styles.dataLabel}>Gyro X:  </Text>
                            <Text style={styles.data}>10</Text>
                        </View>
                        <View style={styles.dataInfo}>
                            <Text style={styles.dataLabel}>Gyro Y: </Text>
                            <Text style={styles.data}>10</Text>
                        </View>
                        <View style={styles.dataInfo}>
                            <Text style={styles.dataLabel}>Gyro Z: </Text>
                            <Text style={styles.data}>10</Text>
                        </View>
                    </View>

                </View>
                <Button title="Stop" onPress={_unsubscribe} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#222',
        flex: 1
    },
    container: {

        padding: 25,

    },
    infoContainer: {
        backgroundColor: '#333',
        minHeight: 95,
        padding: 15,
        borderRadius: 8,
        justifyContent: 'space-between'
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoLabel: {
        fontSize: 25,
        color: '#aaa',

    },
    info: {
        fontSize: 25,
        color: 'white',
        flexWrap: 'wrap',
        flexShrink: 1

    },

    dataContainer: {
        paddingTop: 30,
        paddingBottom: 80,
        justifyContent: 'space-between'
    },
    dataRow: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    dataInfo: {
        // flexDirection: 'row',
        alignItems: 'center'

    },
    dataLabel: {
        fontSize: 20,
        color: '#aaa',
    },
    data: {
        fontSize: 20,
        color: 'white',
        flexWrap: 'wrap',
        flexShrink: 1
    },
    


})

export default Logger;