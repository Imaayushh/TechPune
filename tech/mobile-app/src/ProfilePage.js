import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    SafeAreaView,
    Platform,
    Alert,
    TextInput,
    Switch
} from 'react-native';

const ProfilePage = ({ onBack, userEmail }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);
    
    const [personalInfo, setPersonalInfo] = useState({
        fullName: "Admin User",
        email: userEmail || "admin@techpune.com",
        mobile: "+91 9876543210",
        address: "123 Tech Park, Pune, Maharashtra",
        dob: "15 August 1995"
    });

    const handleChangePicture = () => {
        Alert.alert("Change Picture", "This feature will be available soon.");
    };

    const toggleEdit = () => {
        if (isEditing) {
            Alert.alert("Success", "Profile information updated.");
        }
        setIsEditing(!isEditing);
    };

    const handleAction = (action) => {
        Alert.alert(action, `Redirecting to ${action} settings...`);
    };

    // Helper to render field with divider
    const renderField = (label, value, key, icon, isLast = false, keyboardType = 'default') => (
        <View key={key}>
            <View style={styles.fieldItem}>
                <View style={styles.labelRow}>
                    <Text style={styles.fieldIcon}>{icon}</Text>
                    <Text style={styles.fieldLabel}>{label}</Text>
                </View>
                {isEditing ? (
                    <TextInput 
                        style={styles.fieldInput}
                        value={value}
                        onChangeText={(text) => setPersonalInfo({...personalInfo, [key]: text})}
                        keyboardType={keyboardType}
                    />
                ) : (
                    <Text style={styles.fieldValue}>{value}</Text>
                )}
            </View>
            {!isLast && <View style={styles.divider} />}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeaderSection}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarCircle}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                            ) : (
                                <Text style={styles.avatarPlaceholder}>👤</Text>
                            )}
                        </View>
                        <TouchableOpacity 
                            style={styles.penIconContainer} 
                            onPress={handleChangePicture}
                        >
                            <Text style={styles.penIcon}>✎</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.userInfoTop}>
                        <Text style={styles.userNameText}>{personalInfo.fullName}</Text>
                        <Text style={styles.userEmailText}>{personalInfo.email}</Text>
                    </View>
                </View>

                {/* Personal Information Container */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoSectionHeader}>
                        <Text style={styles.sectionHeading}>Personal Information</Text>
                        <TouchableOpacity style={styles.editBtn} onPress={toggleEdit}>
                            <Text style={styles.editBtnText}>{isEditing ? "Save" : "Edit"}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoFields}>
                        {renderField("Full Name", personalInfo.fullName, "fullName", "●")}
                        {renderField("Email Address", personalInfo.email, "email", "✉", false, 'email-address')}
                        {renderField("Mobile Number", personalInfo.mobile, "mobile", "☎")}
                        {renderField("Address", personalInfo.address, "address", "⌂")}
                        {renderField("Date of Birth", personalInfo.dob, "dob", "◈", true)}
                    </View>
                </View>

                {/* Additional Settings */}
                <View style={styles.additionalSettings}>
                    <TouchableOpacity style={styles.actionItem} onPress={() => handleAction("Change Password")}>
                        <View style={styles.actionLeft}>
                            <View style={styles.iconBox}>
                                <Text style={styles.blackIcon}>🔒</Text>
                            </View>
                            <Text style={styles.actionText}>Change Password</Text>
                        </View>
                        <Text style={styles.chevron}>→</Text>
                    </TouchableOpacity>

                    <View style={styles.actionItem}>
                        <View style={styles.actionLeft}>
                            <View style={styles.iconBox}>
                                <Text style={styles.blackIcon}>🛡</Text>
                            </View>
                            <Text style={styles.actionText}>Two-Factor Authentication</Text>
                        </View>
                        <Switch 
                            value={is2FAEnabled}
                            onValueChange={setIs2FAEnabled}
                            trackColor={{ false: "#cbd5e1", true: "#000" }}
                            thumbColor={"#fff"}
                        />
                    </View>

                    <TouchableOpacity style={styles.actionItem} onPress={() => handleAction("Help & Support")}>
                        <View style={styles.actionLeft}>
                            <View style={styles.iconBox}>
                                <Text style={styles.blackIcon}>?</Text>
                            </View>
                            <Text style={styles.actionText}>Help & Support</Text>
                        </View>
                        <Text style={styles.chevron}>→</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backIcon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'ClashDisplay-Bold',
        color: '#000',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileHeaderSection: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 20,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    avatarPlaceholder: {
        fontSize: 50,
        color: '#000',
    },
    penIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    penIcon: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    userInfoTop: {
        alignItems: 'center',
    },
    userNameText: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'ClashDisplay-Bold',
        color: '#000',
    },
    userEmailText: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    infoContainer: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    infoSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'ClashDisplay-Bold',
        color: '#000',
    },
    editBtn: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    editBtnText: {
        color: '#000',
        fontSize: 11,
        fontWeight: 'bold',
    },
    infoFields: {
        gap: 0,
    },
    fieldItem: {
        paddingVertical: 12,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 4,
    },
    fieldIcon: {
        fontSize: 14,
        color: '#000',
        width: 20,
        textAlign: 'center',
    },
    fieldLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    fieldValue: {
        fontSize: 15,
        color: '#000',
        fontWeight: '600',
        paddingLeft: 30,
    },
    fieldInput: {
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 8,
        fontSize: 15,
        color: '#000',
        marginLeft: 30,
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        width: '100%',
    },
    additionalSettings: {
        marginHorizontal: 20,
        gap: 12,
    },
    actionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    blackIcon: {
        fontSize: 16,
        color: '#000',
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    chevron: {
        fontSize: 16,
        color: '#cbd5e1',
    }
});

export default ProfilePage;
