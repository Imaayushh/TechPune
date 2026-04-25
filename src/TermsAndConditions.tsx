import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export type TermsAndConditionsProps = {
  onBack: () => void;
  onAccept: () => void;
};

export default function TermsAndConditions({ onBack, onAccept }: TermsAndConditionsProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.headerIcon} activeOpacity={0.8}>
          <Text style={styles.headerIconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TERMS & CONDITIONS</Text>
        <View style={styles.headerIcon} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Terms of Service</Text>

          <Text style={styles.sectionHeading}>1. Acceptance of Terms</Text>
          <Text style={styles.bodyText}>
            By accessing and using the TechPune App ("Application"), you agree to be bound by these
            Terms of Service ("Terms"), all applicable laws and regulations, and agree that you are
            responsible for compliance with any applicable local laws. If you do not agree with any
            of these terms, you are prohibited from using or accessing this Application.
          </Text>

          <Text style={styles.sectionHeading}>2. Use License</Text>
          <Text style={styles.bodyText}>
            Permission is granted to temporarily download one copy of the Application for personal,
            non-commercial transitory viewing only. This is the grant of a license, not a transfer
            of title, and under this license you may not:
          </Text>
          <Text style={styles.bodyText}>
            • modify or copy the materials;
          </Text>
          <Text style={styles.bodyText}>
            • use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
          </Text>
          <Text style={styles.bodyText}>
            • attempt to decompile or reverse engineer any software contained in the Application;
          </Text>
          <Text style={styles.bodyText}>
            • remove any copyright or other proprietary notations from the materials; or
          </Text>
          <Text style={styles.bodyText}>
            • transfer the materials to another person or "mirror" the materials on any other server.
          </Text>

          <Text style={styles.sectionHeading}>3. Disclaimer</Text>
          <Text style={styles.bodyText}>
            The materials on the Application are provided on an 'as is' basis. TechPune makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties
            including, without limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of intellectual property or other
            violation of rights.
          </Text>

          <Text style={styles.sectionHeading}>4. Limitations</Text>
          <Text style={styles.bodyText}>
            In no event shall TechPune or its suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising
            out of the use or inability to use the materials on the Application, even if TechPune or
            a TechPune authorized representative has been notified orally or in writing of the
            possibility of such damage.
          </Text>

          <Text style={styles.sectionHeading}>5. Accuracy of Materials</Text>
          <Text style={styles.bodyText}>
            The materials appearing on the Application could include technical, typographical, or
            photographic errors. TechPune does not warrant that any of the materials on its Application
            are accurate, complete, or current. TechPune may make changes to the materials contained
            on its Application at any time without notice. However, TechPune does not make any
            commitment to update the materials.
          </Text>

          <Text style={styles.sectionHeading}>6. Links</Text>
          <Text style={styles.bodyText}>
            TechPune has not reviewed all of the sites linked to its Application and is not responsible
            for the contents of any such linked site. The inclusion of any link does not imply endorsement
            by TechPune of the site. Use of any such linked website is at the user's own risk.
          </Text>

          <Text style={styles.sectionHeading}>7. Modifications</Text>
          <Text style={styles.bodyText}>
            TechPune may revise these terms of service for its Application at any time without notice.
            By using this Application you are agreeing to be bound by the then current version of these
            terms of service.
          </Text>

          <Text style={styles.sectionHeading}>8. Governing Law</Text>
          <Text style={styles.bodyText}>
            These terms and conditions are governed by and construed in accordance with the laws of
            Maharashtra, India and you irrevocably submit to the exclusive jurisdiction of the courts
            in that State or location.
          </Text>
        </View>
      </ScrollView>

      {/* Accept Button */}
      <View style={styles.acceptContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={onAccept}
          activeOpacity={0.85}
        >
          <Text style={styles.acceptButtonText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  headerIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 18,
    color: '#1a1c1c',
    fontFamily: 'Inter-Medium',
  },
  headerTitle: {
    fontSize: 11,
    letterSpacing: 2.2,
    color: '#1a1c1c',
    fontFamily: 'Inter-Semibold',
    textAlign: 'left',
    flex: 1,
    marginLeft: 16,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 16,
    fontFamily: 'CabinetGrotesk-Bold',
    color: '#1a1c1c',
    marginTop: 20,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    color: '#1a1c1c',
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    marginBottom: 16,
  },
  acceptContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f9f9f9',
  },
  acceptButton: {
    height: 58,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  acceptButtonText: {
    color: '#e2e2e2',
    fontSize: 16,
    fontFamily: 'Inter-Semibold',
    letterSpacing: 0.2,
  },
});