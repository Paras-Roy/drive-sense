import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";

const Results = () => {
    return ( 
        <TouchableWithoutFeedback
        onPress={()=>Keyboard.dismiss()}>

        </TouchableWithoutFeedback>
     );
}
 
export default Results;