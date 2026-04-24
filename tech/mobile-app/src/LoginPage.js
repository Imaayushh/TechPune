import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform,
    Alert,
    Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const emailIcon = require('./email_icon.png');
const lockIcon = require('./lock_icon.png');
const eyeOpenIcon = require('./eye_icon.png');
const eyeClosedIcon = require('./eye_icon_closed.png');
const googleLogo = require('./google_logo.png');
const githubLogo = require('./github_logo.png');

const LoginPage = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const validatePassword = (value) => {
        const hasAlpha = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[@$!%*?&#]/.test(value);
        
        if (value && (!hasAlpha || !hasNumber || !hasSpecial)) {
            setError('Password must contain letters, numbers, and special characters (e.g. @).');
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        validatePassword(value);
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.card}>
                        <Text style={styles.title}>TechPune</Text>
                        
                        <View style={styles.form}>
                            <View style={styles.formGroup}>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWithIcon}>
                                        <Image source={emailIcon} style={styles.inputIcon} />
                                        <TextInput 
                                            style={styles.input}
                                            placeholder="Email"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            placeholderTextColor="#94a3b8"
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <View style={styles.inputWithIcon}>
                                    <Image source={lockIcon} style={styles.inputIcon} />
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChangeText={handlePasswordChange}
                                        secureTextEntry={!showPassword}
                                        placeholderTextColor="#94a3b8"
                                    />
                                    <TouchableOpacity 
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.viewPasswordButton}
                                        activeOpacity={0.7}
                                    >
                                        <Image 
                                            source={showPassword ? eyeOpenIcon : eyeClosedIcon} 
                                            style={styles.eyeIcon} 
                                        />
                                    </TouchableOpacity>
                                </View>
                                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                            </View>

                            <TouchableOpacity 
                                style={styles.signinButton} 
                                onPress={() => {
                                    if (!email) {
                                        Alert.alert("Error", "Please enter your email");
                                        return;
                                    }
                                    onSignIn(email);
                                }}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.signinButtonText}>Sign In</Text>
                            </TouchableOpacity>

                            <View style={styles.orSeparator}>
                                <View style={styles.separatorLine} />
                                <Text style={styles.orText}>or</Text>
                                <View style={styles.separatorLine} />
                            </View>

                            <View style={styles.socialLogins}>
                                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                                    <Image source={googleLogo} style={styles.socialLogo} />
                                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                                    <Image source={githubLogo} style={styles.socialLogo} />
                                    <Text style={styles.socialButtonText}>Continue with Github</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#d1d5db',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#d1d5db',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: 32,
        fontFamily: 'ClashDisplay-Bold',
    },
    form: {
        width: '100%',
    },
    formGroup: {
        marginBottom: 16,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#f8fafc',
        height: 56,
    },
    inputIcon: {
        width: 22,
        height: 22,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1e293b',
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
    },
    viewPasswordButton: {
        paddingHorizontal: 8,
    },
    eyeIcon: {
        width: 20,
        height: 20,
        opacity: 0.6,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 6,
    },
    signinButton: {
        backgroundColor: '#1e293b',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },

    disabledButton: {
        backgroundColor: '#94a3b8',
    },
    signinButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'CabinetGrotesk-Medium',
    },
    orSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e8f0',
    },
    orText: {
        marginHorizontal: 10,
        color: '#94a3b8',
        fontSize: 14,
    },
    socialLogins: {
        gap: 12,
    },
    socialButton: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    socialLogo: {
        width: 20,
        height: 20,
        marginRight: 12,
    },
    socialButtonText: {
        color: '#1e293b',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default LoginPage;
