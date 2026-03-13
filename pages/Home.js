import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {

    const presentCount = history.filter(item => item.status === "Present").length;
    const absentCount = history.filter(item => item.status === "Absent").length;

    const renderItem = ({item}) => (
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
                <Text
                    style={item.status === "Present"
                        ? styles.present
                        : styles.absent
                    }>
                    {item.status}
                </Text>
            </View>
        </View>
    )

    return (
    <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.content}>

       <Text style={styles.title}>Attendance App</Text>

    <View style={styles.card}>
        <View style={styles.icon}>
        <MaterialIcons name="person" size={40} color="#555" />
        </View>

        <View>
        <Text style={styles.name}>Rizqa Fakhirah</Text>
        <Text>NIM : 0320240069</Text>
        <Text>Class : MI-2A</Text>
        </View>
    </View>

    <View style={styles.classCard}>
        <Text style={styles.subtitle}>Today's Class</Text>
        <Text>Mobile Programming</Text>
        <Text>08:00 - 10:00</Text>
        <Text>Lab 3</Text>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>CHECK IN</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.classCard}>
        <Text style={styles.subtitle}>Upcoming Class</Text>
        <Text>Database System</Text>
        <Text>10:30 - 12:00</Text>
        <Text>Room 203</Text>
    </View>

    <View style={styles.summaryCard}>
        <Text style={styles.subtitle}>Attendance Summary</Text>
        <Text>Present : {presentCount}</Text>
        <Text>Absent : {absentCount}</Text>
    </View>

        <Text style={styles.subtitle}>Attendance History</Text>
            <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            />

        </ScrollView>
    </SafeAreaView>
    );
};

const history = [
    {id:"1", course: "Mobile Programming", date: "2026-03-01", status: "Present"},
    {id:"2", course: "Database System", date: "2026-03-02", status: "Present"},
    {id:"3", course: "Operating System", date: "2026-03-03", status: "Absent"},
    {id:"4", course: "Computer Network", date: "2026-03-04", status: "Present"},
    {id:"5", course: "Web Programming", date: "2026-03-05", status: "Present"},
    {id:"6", course: "Artificial Intelligence", date: "2026-03-06", status: "Absent"},
    {id:"7", course: "Software Engineering", date: "2026-03-07", status: "Present"},
    {id:"8", course: "Data Structure", date: "2026-03-08", status: "Present"},
    {id:"9", course: "Mobile Programming", date: "2026-03-09", status: "Present"},
    {id:"10", course: "Database System", date: "2026-03-10", status: "Absent"},
    {id:"11", course: "Operating System", date: "2026-03-11", status: "Present"},
    {id:"12", course: "Computer Network", date: "2026-03-12", status: "Present"},
    {id:"13", course: "Web Programming", date: "2026-03-13", status: "Absent"},
    {id:"14", course: "Artificial Intelligence", date: "2026-03-14", status: "Present"},
    {id:"15", course: "Software Engineering", date: "2026-03-15", status: "Present"},
    {id:"16", course: "Data Structure", date: "2026-03-16", status: "Absent"},
    {id:"17", course: "Mobile Programming", date: "2026-03-17", status: "Present"},
    {id:"18", course: "Database System", date: "2026-03-18", status: "Present"},
    {id:"19", course: "Operating System", date: "2026-03-19", status: "Present"},
    {id:"20", course: "Computer Network", date: "2026-03-20", status: "Absent"},
    {id:"21", course: "Web Programming", date: "2026-03-21", status: "Present"},
    {id:"22", course: "Artificial Intelligence", date: "2026-03-22", status: "Present"},
    {id:"23", course: "Software Engineering", date: "2026-03-23", status: "Absent"},
    {id:"24", course: "Data Structure", date: "2026-03-24", status: "Present"},
];

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },

    content: {
        padding: 20,
        paddingBottom: 40
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15
    },

    card: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },

    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15
    },

    name: {
        fontSize: 18,
        fontWeight: "bold"
    },

    classCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },

    summaryCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },

    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },

    button: {
        marginTop: 10,
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center"
    },

    buttonText: {
        color: "white"
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8
    },

    statusContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:5
    },

    course: {
        fontSize: 16
    },
    
    date: {
        fontSize: 12,
        color: "gray"
    },

    present: {
        color: "green",
        fontWeight: "bold",
        marginLeft:5
    },

    absent: {
        color: "red",
        fontWeight: "bold",
        marginLeft:5
    },
});