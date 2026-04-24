import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Image,
    Dimensions,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Dashboard = ({ onLogout, onProfileClick }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.logoText}>TechPune</Text>
                <TouchableOpacity style={styles.profileIcon} onPress={onProfileClick}>
                    <Text style={styles.userIcon}>👤</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.welcomeBack}>WELCOME BACK</Text>
                    <Text style={styles.heroTitle}>Curated{"\n"}Opportunities</Text>
                    <Text style={styles.heroDescription}>
                        A bespoke selection of hackathons, courses, and internships tailored to your growing expertise.
                    </Text>
                </View>

                {/* Active Engagements Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Active Engagements</Text>
                    
                    {/* Hackathon Card */}
                    <View style={styles.activeCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>⌨️ HACKATHON</Text>
                            </View>
                            <Text style={styles.timeLeft}>Ends in 3 Days</Text>
                        </View>
                        <Text style={styles.cardMainTitle}>Global AI Summit Challenge</Text>
                        <Text style={styles.cardDescription}>
                            Developing predictive models for sustainable urban infrastructure.
                        </Text>
                        <View style={styles.cardFooter}>
                            <View style={styles.avatars}>
                                <View style={[styles.avatar, { backgroundColor: '#1e293b' }]}>
                                    <Text style={styles.avatarInitial}>JD</Text>
                                </View>
                                <View style={[styles.avatar, { backgroundColor: '#475569', marginLeft: -10 }]}>
                                    <Text style={styles.avatarInitial}>AS</Text>
                                </View>
                                <View style={[styles.avatar, { backgroundColor: '#f1f5f9', marginLeft: -10, borderWidth: 1, borderColor: '#e2e8f0' }]}>
                                    <Text style={[styles.avatarInitial, { color: '#64748b' }]}>+2</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.workspaceLink}>Go to Workspace</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Course Card */}
                    <View style={[styles.activeCard, { backgroundColor: '#f8fafc' }]}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
                                <Text style={styles.badgeText}>🎓 COURSE</Text>
                            </View>
                        </View>
                        <Text style={styles.cardMainTitle}>Advanced Data Structures</Text>
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFill, { width: '65%' }]} />
                            </View>
                            <Text style={styles.progressText}>65% Complete</Text>
                        </View>
                        <TouchableOpacity style={styles.resumeButton}>
                            <Text style={styles.resumeButtonText}>Resume Learning  →</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Upcoming Recommended Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Upcoming Recommended</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Recommended Item 1 */}
                    <View style={styles.recommendedItem}>
                        <View style={styles.iconBox}>
                            <Text style={styles.iconEmoji}>💼</Text>
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Product Design Internship</Text>
                            <Text style={styles.itemSubtitle}>TechFlow Studio • San Francisco (Hybrid)</Text>
                            <View style={styles.itemFooter}>
                                <Text style={styles.itemStatus}>Closes in 2 weeks</Text>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusBadgeText}>High Match</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Recommended Item 2 */}
                    <View style={styles.recommendedItem}>
                        <View style={styles.iconBox}>
                            <Text style={styles.iconEmoji}>🗓️</Text>
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>The Future of Spatial Computing</Text>
                            <Text style={styles.itemSubtitle}>Webinar • Hosted by Nexus XR</Text>
                            <View style={styles.itemFooter}>
                                <Text style={styles.itemStatus}>Tomorrow, 10:00 AM</Text>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusBadgeText}>Design Track</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                
                {/* Spacer for bottom nav */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNavContainer}>
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItemContainer}>
                        <View style={styles.navIconContainerActive}>
                            <Text style={styles.navIconActive}>🔳</Text>
                        </View>
                        <Text style={styles.navLabelActive}>DASHBOARD</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.navItemContainer}>
                        <View style={styles.navIconContainer}>
                            <Text style={styles.navIcon}>⌨️</Text>
                        </View>
                        <Text style={styles.navLabel}>HACKATHONS</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.navItemContainer}>
                        <View style={styles.navIconContainer}>
                            <Text style={styles.navIcon}>📰</Text>
                        </View>
                        <Text style={styles.navLabel}>NEWS</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.navItemContainer}>
                        <View style={styles.navIconContainer}>
                            <Text style={styles.navIcon}>🎓</Text>
                        </View>
                        <Text style={styles.navLabel}>GUIDANCE</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    menuIcon: {
        fontSize: 24,
        color: '#000',
    },
    logoText: {
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
        color: '#000',
        fontFamily: 'ClashDisplay-Bold',
    },
    userIcon: {
        fontSize: 24,
        color: '#000',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    heroSection: {
        marginBottom: 40,
    },
    welcomeBack: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#94a3b8',
        letterSpacing: 2,
        marginBottom: 10,
    },
    heroTitle: {
        fontSize: 42,
        fontWeight: '900',
        color: '#000',
        lineHeight: 48,
        marginBottom: 20,
        fontFamily: 'ClashDisplay-Bold',
    },
    heroDescription: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
    },
    section: {
        marginBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 20,
        fontFamily: 'CabinetGrotesk-Bold',
    },
    viewAll: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    activeCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    badge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#64748b',
    },
    timeLeft: {
        fontSize: 12,
        color: '#64748b',
    },
    cardMainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 12,
    },
    cardDescription: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    avatarInitial: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    workspaceLink: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        textDecorationLine: 'underline',
    },
    progressContainer: {
        marginBottom: 20,
    },
    progressBar: {
        height: 6,
        backgroundColor: '#e2e8f0',
        borderRadius: 3,
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
    resumeButton: {
        backgroundColor: '#000',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resumeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recommendedItem: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    iconBox: {
        width: 50,
        height: 50,
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconEmoji: {
        fontSize: 24,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 12,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemStatus: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
    },
    statusBadge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#64748b',
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        width: '100%',
        height: 85,
        borderRadius: 24,
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        paddingHorizontal: 15,
    },
    navItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIconContainer: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    navIconContainerActive: {
        width: 48,
        height: 48,
        backgroundColor: '#000',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    navIcon: {
        fontSize: 20,
        color: '#94a3b8',
    },
    navIconActive: {
        fontSize: 20,
        color: '#ffffff',
    },
    navLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#94a3b8',
        letterSpacing: 0.5,
    },
    navLabelActive: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 0.5,
    },
});

export default Dashboard;

