import React, {
  useState,
  useEffect,
  useMemo,
  useRef
} from "react";
import { View, Text, SafeAreaView, StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  // 2. STATE UNTUK STATUS TOMBOL CHECK-IN
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // 3. STATE UNTUK JAM DIGITAL
  const [currentTime, setCurrentTime] = useState('Memuat jam...');

  // 4. STATE & REF UNTUK CATATAN (Baru)
  const [note, setNote] = useState('');
  const noteInputRef = useRef(null); // Membuat "kait" kosong untuk UI

  // Simulasi statistik karena data dipindah ke HistoryScreen
  const attendanceStats = useMemo(() => {
    return { totalPresent: 12, totalAbsent: 2 };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    if (isCheckedIn) return Alert.alert({ title: "Perhatian", message: "Anda sudah Check In." });
    if (note.trim() === '') {
      Alert.alert({ title: "Peringatan", message: "Catatan kehadiran wajib diisi!" });
      noteInputRef.current.focus();
      return;
    }
    setIsCheckedIn(true);
    Alert.alert({ title: "Sukses", message: `Berhasil Check In pada pukul ${currentTime}` });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          {/* Tampilkan State Jam Digital */}
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        {/* Student Card */}
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

          {/* Fitur Baru: Kolom Input Catatan dengan useRef */}
          {!isCheckedIn && (
            <TextInput
              ref={noteInputRef} // <-- Menempelkan referensi ke elemen ini
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
            <Text style={styles.buttonText}>
              {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fitur Baru: Statistik Kehadiran (Hasil useMemo) */}
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

      </ScrollView>
    </SafeAreaView>
  );
};

// Untuk Styling sama dengan kode sebelumnya.
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
});

export default HomeScreen;