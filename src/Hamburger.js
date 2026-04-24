import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const Hamburger = ({ onBack, onLogout, onProfileClick, userEmail }) => {
    
    const MenuSection = ({ title, items }) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={[
                        styles.menuItem, 
                        item.active && styles.activeMenuItem
                    ]}
                    activeOpacity={0.85}
                    onPress={() => {
                        if (item.target === 'dashboard') onBack();
                        else if (item.target === 'profile') onProfileClick();
                        else if (item.target === 'logout') onLogout();
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Text style={[
                            styles.menuIcon, 
                            item.logout && styles.menuIconLogout,
                            item.active && styles.menuIconActive
                        ]}>
                            {item.icon}
                        </Text>
                    </View>
                    <Text style={[
                        styles.menuText, 
                        item.logout && styles.menuTextLogout,
                        item.active && styles.menuTextActive
                    ]}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const mainItems = [
        { title: 'DASHBOARD', icon: '▣', target: 'dashboard', active: true },
        { title: 'HACKATHONS', icon: '▦', target: 'hackathons' },
        { title: 'NEWS', icon: '▤', target: 'news' },
        { title: 'GUIDANCE', icon: '◻', target: 'guidance' },
    ];


    const accountItems = [
        { title: 'Settings', icon: '⚙', target: 'settings' },
        { title: 'Privacy & Security', icon: '⟐', target: 'privacy' },
        { title: 'Help & Support', icon: '?', target: 'help' },
    ];

    const otherItems = [
        { title: 'Log Out', icon: '↘', target: 'logout', logout: true },
    ];

    return (
        <View style={styles.overlay}>
            {/* Backdrop */}
            <TouchableWithoutFeedback onPress={onBack}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            {/* Drawer Content */}
            <View style={styles.drawerContainer}>
                <SafeAreaView style={styles.safeArea}>
                    {/* Header / Profile Section */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.closeButton} onPress={onBack} activeOpacity={0.85}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                        <View style={styles.profileSection}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarEmoji}>⌁</Text>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.userName}>Scholar</Text>
                                <Text style={styles.userEmail}>{userEmail || 'scholar@university.edu'}</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <MenuSection title="MAIN" items={mainItems} />
                        <MenuSection title="ACCOUNT" items={accountItems} />
                        <MenuSection title="OTHER" items={otherItems} />
                        
                        <View style={{ height: 40 }} />
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        zIndex: 1000,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },
    drawerContainer: {
        width: width * 0.8, // 80% width as a drawer
        height: height,
        backgroundColor: '#e2e2e2',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.08,
        shadowRadius: 30,
        elevation: 10,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 25,
        paddingTop: 6,
        paddingBottom: 18,
    },
    closeButton: {
        alignSelf: 'flex-start',
        marginBottom: 18,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    closeText: {
        fontSize: 22,
        color: '#1a1c1c',
        fontFamily: 'Inter-Medium',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarEmoji: {
        fontSize: 18,
        color: '#1a1c1c',
        fontFamily: 'Inter-Semibold',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 26,
        color: '#1a1c1c',
        fontFamily: 'ClashDisplay-Bold',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 13,
        color: '#5f5e5e',
        fontFamily: 'Inter-Regular',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    section: {
        marginBottom: 18,
    },
    sectionTitle: {
        fontSize: 11,
        color: '#5f5e5e',
        letterSpacing: 1.8,
        marginBottom: 15,
        marginLeft: 10,
        fontFamily: 'Inter-Semibold',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 16,
        marginBottom: 4,
        backgroundColor: '#eeeeee',
    },
    activeMenuItem: {
        backgroundColor: '#ffffff',
    },
    iconContainer: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuIcon: {
        fontSize: 18,
        color: '#1a1c1c',
        fontFamily: 'Inter-Semibold',
    },
    menuIconActive: { color: '#1a1c1c' },
    menuIconLogout: { color: '#1a1c1c' },
    menuText: {
        fontSize: 16,
        color: '#1a1c1c',
        fontFamily: 'CabinetGrotesk-Medium',
    },
    menuTextActive: { color: '#1a1c1c', fontFamily: 'CabinetGrotesk-Bold' },
    menuTextLogout: { color: '#1a1c1c' },
});

export default Hamburger;
