import React, { useState, useEffect } from "react"; // Langkah 1
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  FlatList, 
  Alert // Tambahkan Alert sesuai Langkah 1
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Langkah 2: Pindahkan data statis ke atas sebelum komponen Home
const initialHistory = [
  { id: "1", course: "Web Programming", date: "2026-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
];

const Home = () => {
  // Langkah 2: State management
  const [historyData, setHistoryData] = useState(initialHistory);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState('Memuat jam...');

  // Langkah 3: useEffect untuk Jam Real-time
  useEffect(() => {
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    }, 1000);

    // Cleanup: Mematikan timer jika layar ditutup
    return () => clearInterval(timer);
  }, []);

  // Langkah 4: Logika Tombol Check-In
  const handleCheckIn = () => {
    if (isCheckedIn) {
      Alert.alert("Perhatian", "Anda sudah melakukan Check In untuk kelas ini.");
      return;
    }

    // 1. Buat data presensi baru
    const newAttendance = {
      id: Date.now().toString(), // ID unik dari timestamp
      course: "Mobile Programming",
      date: new Date().toLocaleDateString('id-ID'), // Tanggal hari ini
      status: "Present"
    };

    // 2. Masukkan ke urutan paling atas daftar history
    setHistoryData([newAttendance, ...historyData]);

    // 3. Kunci tombol
    setIsCheckedIn(true);
    Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
  };

  // Render Item untuk FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <MaterialIcons
          name={item.status === "Present" ? "check-circle" : "cancel"}
          size={20}
          color={item.status === "Present" ? "green" : "red"}
        />
        <Text style={item.status === "Present" ? styles.present : styles.absent}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Langkah 5: Update UI Header */}
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

          {/* Langkah 5: Modifikasi Tombol Check In */}
          <TouchableOpacity
            style={[
              styles.button, 
              isCheckedIn ? styles.buttonDisabled : styles.buttonActive
            ]}
            onPress={handleCheckIn}
            disabled={isCheckedIn}
          >
            <Text style={styles.buttonText}>
              {isCheckedIn ? 'CHECKED IN' : 'CHECK IN'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* History */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Attendance History</Text>
          <FlatList
            data={historyData} // Menggunakan data dari State
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Langkah 6: Styling
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  content: { padding: 20, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  clockText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    fontVariant: ['tabular-nums'],
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  icon: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: "#eee", alignItems: "center", justifyContent: "center",
    marginRight: 15
  },
  name: { fontSize: 18, fontWeight: "bold" },
  classCard: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  button: { marginTop: 10, padding: 12, borderRadius: 8, alignItems: "center" },
  buttonActive: { backgroundColor: "#007AFF" },
  buttonDisabled: { backgroundColor: "#A0C4FF" },
  buttonText: { color: "white", fontWeight: "bold" },
  item: {
    flexDirection: "row", justifyContent: "space-between",
    backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8, marginBottom: 8
  },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  course: { fontSize: 16 },
  date: { fontSize: 12, color: "gray" },
  present: { color: "green", fontWeight: "bold", marginLeft: 5 },
  absent: { color: "red", fontWeight: "bold", marginLeft: 5 },
});

export default Home;