import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [carnet, setCarnet] = useState('');
  const [materiaFavorita, setMateriaFavorita] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idCounter, setIdCounter] = useState(1);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; 
    setShow(false); 
    setFechaNacimiento(currentDate); 
  };

  const showMode = (currentMode) => {
    setShow(true); 
    setMode(currentMode); 
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const agregarAlumno = () => {
    const nuevoAlumno = { id: idCounter, nombre: nombre, fechaNacimiento: fechaNacimiento, carnet: carnet, materiaFavorita: materiaFavorita };
    setAlumnos([...alumnos, nuevoAlumno]); 
    setIdCounter(idCounter + 1); 
    setNombre(''); 
    setCarnet(''); 
    setMateriaFavorita(''); 
    setFechaNacimiento(new Date()); 
    setModalVisible(false); 
  };

  const eliminarAlumno = (id) => {
    setAlumnos(alumnos.filter((alumno) => alumno.id !== id)); 
  };

  const handleCarnetChange = (text) => {
    const newText = text.replace(/[^0-9]/g, ''); 
    setCarnet(newText); 
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alumnos}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.halfContainer}>
            <View style={styles.alumnoCard}>
              <Text style={styles.alumnoNombre}>ID: {item.id}</Text>
              <Text style={styles.alumnoNombre}>Nombre: {item.nombre}</Text>
              <Text style={styles.alumnoNombre}>Carnet: {item.carnet}</Text>
              <Text style={styles.alumnoNombre}>Materia Favorita: {item.materiaFavorita}</Text>
              <Text style={styles.alumnoFecha}>Fecha de Nacimiento: {item.fechaNacimiento.toLocaleDateString()}</Text>
              <Button title="Eliminar" onPress={() => eliminarAlumno(item.id)} />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addButton}>Agregar Alumno</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>FORMULARIO DE REGISTRO DE ALUMNOS</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Alumno"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Carnet"
              value={carnet}
              onChangeText={handleCarnetChange}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Materia Favorita"
              value={materiaFavorita}
              onChangeText={setMateriaFavorita}
            />
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={styles.datePickerText}>Seleccionar fecha de Nacimiento</Text>
            </TouchableOpacity>
            <Text style={styles.selectedDate}>Fecha de Nacimiento: {fechaNacimiento.toLocaleDateString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={styles.buttonGroup}>
              <Button title="Agregar Alumno" onPress={agregarAlumno} />
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 28,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  halfContainer: {
    flex: 0.5, // Cada tarjeta de alumno ocupa la mitad del ancho de la pantalla
    paddingHorizontal: 5,
  },
  alumnoCard: {
    backgroundColor: '#F3F3F3',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  alumnoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alumnoFecha: {
    fontSize: 14,
  },
});

export default App;
