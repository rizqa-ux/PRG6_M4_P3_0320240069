import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  FlatList, 
  Alert,
  TextInput
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const initialHistory = [
  { id: "1", course: "Web Programming", date: "2026-03-01", status: "Absent" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
];

const Home = () => {
  const [historyData, setHistoryData] = useState(initialHistory);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState('Memuat jam...');
  const [note, setNote] = useState('');
  const noteInputRef = useRef(null);

  // Statistik dengan useMemo
  const attendanceStats = useMemo(() => {
    console.log("Menghitung ulang statistik kehadiran...");
    const presentCount = historyData.filter(item => item.status === 'Present').length;
    const absentCount = historyData.filter(item => item.status === 'Absent').length;
    return { totalPresent: presentCount, totalAbsent: absentCount };
  }, [historyData]);

  // Jam realtime
  useEffect(() => {
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      setCurrentTime(timeString);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Check In
  const handleCheckIn = () => {
    if (isCheckedIn) return;

    if (note.trim() === '') {
      Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
      noteInputRef.current.focus();
      return;
    }

    const now = new Date();
    const tanggal = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    const newAttendance = {
      id: Date.now().toString(),
      course: "Mobile Programming",
      date: tanggal,
      status: "Present",
      note: note
    };

    setHistoryData([newAttendance, ...historyData]);
    setIsCheckedIn(true);
    Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={item.status === "Present" ? styles.present : styles.absent}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        {/* Profil Card */}
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>
          <View>
            <Text style={styles.name}>Budi Susanto</Text>
            <Text>NIM : 0325260031</Text>
            <Text>Class : Informatika-2B</Text>
          </View>
        </View>

        {/* Today's Class */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>

          {/* Input Catatan — hanya muncul sebelum check in */}
          {!isCheckedIn && (
            <TextInput
              ref={noteInputRef}
              style={styles.inputCatatan}
              placeholder="Tulis catatan (cth: Hadir lab)"
              value={note}
              onChangeText={setNote}
            />
          )}

          <TouchableOpacity
            style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
            onPress={handleCheckIn}
            disabled={isCheckedIn}
          >
            <Text style={styles.buttonText}>{isCheckedIn ? 'CHECKED IN' : 'CHECK IN'}</Text>
          </TouchableOpacity>
        </View>

        {/* Statistik useMemo */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{attendanceStats.totalPresent}</Text>
            <Text style={styles.statLabel}>Total Present</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: 'red' }]}>{attendanceStats.totalAbsent}</Text>
            <Text style={styles.statLabel}>Total Absent</Text>
          </View>
        </View>

        {/* Attendance History */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Attendance History</Text>
          <FlatList
            data={historyData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  content: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 24, fontWeight: "bold" },
  clockText: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  card: { 
    flexDirection: "row", 
    backgroundColor: "white", 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 20,
    alignItems: 'center'
  },
  icon: { 
    width: 60, height: 60, borderRadius: 30, 
    backgroundColor: "#eee", alignItems: "center", 
    justifyContent: "center", marginRight: 15 
  },
  name: { fontSize: 18, fontWeight: "bold" },
  classCard: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  inputCatatan: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#fafafa',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: 'green' },
  statLabel: { fontSize: 14, color: 'gray' },
  button: { marginTop: 15, padding: 12, borderRadius: 8, alignItems: "center" },
  buttonActive: { backgroundColor: "#007AFF" },
  buttonDisabled: { backgroundColor: "#A0C4FF" },
  buttonText: { color: "white", fontWeight: "bold" },
  item: { 
    flexDirection: "row", justifyContent: "space-between", 
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' 
  },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  course: { fontSize: 16 },
  date: { fontSize: 12, color: "gray" },
  present: { color: "green", fontWeight: "bold" },
  absent: { color: "red", fontWeight: "bold" },
});

export default Home;