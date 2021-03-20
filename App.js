import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View ,ScrollView} from 'react-native';
import Task from './components/task';
export default function App() {

  const [task,setTask] = useState();
  const [taskItems,setTaskItems] = useState([]);
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems,task])
    setTask(null)
  }

  const completeTask = (index) => {
    let itemCopy = [...taskItems];
    itemCopy.splice(index,1);
    setTaskItems(itemCopy);
  }

  return (
    <View style={styles.container}>

    {/* Added this scroll view to enable scrolling when list gets longer than the page */}
    <ScrollView
    contentContainerStyle={{
      flexGrow: 1
    }}
    keyboardShouldPersistTaps='handled'
    >


      <View style={styles.taskWrapper}>

        <Text style={styles.sectionTitle}>Today's Task</Text>

        <View style={styles.items}>
          {/* Here tasks will go*/}

          {
            taskItems.map((item,index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                   <Task text={item} />
                </TouchableOpacity>
              )
              
            })
          }

          
        </View>


      </View>
      
      </ScrollView>
      {/* Input Task View */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} 
        placeholder={"Write a Task"} 
          value={task}
          onChangeText={text => setTask(text)} 
        />

        <TouchableOpacity onPress={() => handleAddTask() }>
          <View style={styles.addWrapper}>
            <Text styles={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    
  },
  taskWrapper:{
    paddingTop:80,
    paddingHorizontal: 20,
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  items:{
    marginTop:30,
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-around',
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'white',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#C0C0C0',
    borderWidth:1
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:'white',  
    borderRadius:60,
    width:250,
    borderColor:'#C0C0C0',
    borderWidth:1
  },
  addText:{

  }


});
