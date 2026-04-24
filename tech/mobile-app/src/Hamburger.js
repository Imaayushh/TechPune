import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';

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
                    onPress={() => {
                        if (item.target === 'dashboard') onBack();
                        else if (item.target === 'profile') onProfileClick();
                        else if (item.target === 'logout') onLogout();
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Text style={[
                            styles.menuIcon, 
                            item.logout && { color: '#ef4444' },
                            item.active && { color: '#000' }
                        ]}>
                            {item.icon}
                        </Text>
                    </View>
                    <Text style={[
                        styles.menuText, 
                        item.logout && { color: '#ef4444' },
                        item.active && { color: '#000' }
                    ]}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const mainItems = [
        { title: 'DASHBOARD', icon: '🔳', target: 'dashboard', active: true },
        { title: 'HACKATHONS', icon: '⌨️', target: 'hackathons' },
        { title: 'NEWS', icon: '📰', target: 'news' },
        { title: 'GUIDANCE', icon: '🎓', target: 'guidance' },
    ];


    const accountItems = [
        { title: 'Settings', icon: '⚙️', target: 'settings' },
        { title: 'Privacy & Security', icon: '🛡️', target: 'privacy' },
        { title: 'Help & Support', icon: '❓', target: 'help' },
    ];

    const otherItems = [
        { title: 'Log Out', icon: '📥', target: 'logout', logout: true },
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
                        <TouchableOpacity style={styles.closeButton} onPress={onBack}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                        <View style={styles.profileSection}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarEmoji}>👤</Text>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.userName}>Atharv Chougule</Text>
                                <Text style={styles.userEmail}>{userEmail || 'atharv@gmail.com'}</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.divider} />
                        
                        <MenuSection title="MAIN" items={mainItems} />
                        
                        <View style={styles.divider} />
                        
                        <MenuSection title="ACCOUNT" items={accountItems} />
                        
                        <View style={styles.divider} />
                        
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    },
    drawerContainer: {
        width: width * 0.8, // 80% width as a drawer
        height: height,
        backgroundColor: '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 25,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        paddingBottom: 20,
    },
    closeButton: {
        alignSelf: 'flex-start',
        marginBottom: 30,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    closeText: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: '300',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    avatarEmoji: {
        fontSize: 24,
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        fontFamily: 'ClashDisplay-Bold',
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 13,
        color: '#888',
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#1a1a1a',
        marginVertical: 15,
        marginHorizontal: 5,
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#444',
        letterSpacing: 1.5,
        marginBottom: 15,
        marginLeft: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginBottom: 4,
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
        color: '#ffffff',
    },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        fontFamily: 'CabinetGrotesk-Medium',
    },
});

export default Hamburger;
