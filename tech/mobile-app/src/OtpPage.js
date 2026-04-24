import React, { useState, useRef } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform,
    ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OtpPage = ({ email, onVerify, onBack }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [sendStatus, setSendStatus] = useState('');
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = () => {
        const otpValue = otp.join('');
        if (otpValue === '123456') {
            onVerify();
        } else {
            setError('Invalid OTP. Please try again.');
        }
    };

    const handleSendOtp = () => {
        setSendStatus(`OTP sent to ${email}`);
        setTimeout(() => setSendStatus(''), 3000);
    };

    const handleTryAgain = () => {
        setOtp(['', '', '', '', '', '']);
        setError('');
        handleSendOtp();
        inputRefs.current[0].focus();
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Enter Your OTP</Text>
                        <Text style={styles.subtitle}>
                            OTP was sent to Gmail: <Text style={styles.emailHighlight}>{email}</Text>
                        </Text>

                        {sendStatus ? (
                            <View style={styles.sendStatusContainer}>
                                <Text style={styles.sendStatusText}>{sendStatus}</Text>
                            </View>
                        ) : null}

                        <TouchableOpacity 
                            style={styles.sendOtpButton} 
                            onPress={handleSendOtp}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.sendOtpButtonText}>Send OTP</Text>
                        </TouchableOpacity>

                        <View style={styles.otpInputsContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.otpBox}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(value) => handleChange(value, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    ref={(ref) => inputRefs.current[index] = ref}
                                />
                            ))}
                        </View>

                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                                <TouchableOpacity onPress={handleTryAgain}>
                                    <Text style={styles.tryAgainText}>Try Again</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}

                        <TouchableOpacity 
                            style={styles.enterButton} 
                            onPress={handleSubmit}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.enterButtonText}>Enter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={onBack}>
                            <Text style={styles.backButtonText}>Back to Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 20,
    },
    emailHighlight: {
        color: '#2563eb',
        fontWeight: '600',
    },
    sendStatusContainer: {
        backgroundColor: '#ecfdf5',
        padding: 10,
        borderRadius: 12,
        marginBottom: 16,
        width: '100%',
        alignItems: 'center',
    },
    sendStatusText: {
        color: '#059669',
        fontSize: 14,
        fontWeight: '500',
    },
    sendOtpButton: {
        backgroundColor: '#f1f5f9',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 24,
    },
    sendOtpButtonText: {
        color: '#1e293b',
        fontSize: 14,
        fontWeight: '600',
    },
    otpInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
    },
    otpBox: {
        width: 45,
        height: 56,
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    errorContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
        marginBottom: 4,
    },
    tryAgainText: {
        color: '#2563eb',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    enterButton: {
        backgroundColor: '#1e293b',
        width: '100%',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    enterButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 8,
    },
    backButtonText: {
        color: '#64748b',
        fontSize: 14,
    },
});

export default OtpPage;
