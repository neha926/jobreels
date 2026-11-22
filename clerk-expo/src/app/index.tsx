import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { PhoneAuthView } from '@/components/PhoneAuthView';

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const phoneNumber =
    user?.primaryPhoneNumber?.phoneNumber || 'Verified Phone Account';

  return (
    <SafeAreaView style={styles.safeArea}>
      <SignedOut>
        <PhoneAuthView />
      </SignedOut>

      <SignedIn>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Top Bar */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoBadgeText}>JR</Text>
              </View>
              <View>
                <Text style={styles.appName}>JobReels</Text>
                <Text style={styles.appSub}>Free Job & Video Reels</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => signOut()}
              style={styles.signOutButton}
            >
              <Ionicons name="log-out-outline" size={18} color="#ef4444" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>

          {/* User Profile Card (PRD Section 4) */}
          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.firstName?.charAt(0) || 'C'}
              </Text>
              <View style={styles.verifiedDot} />
            </View>

            <View style={styles.userInfo}>
              <View style={styles.verifiedRow}>
                <Text style={styles.userName}>
                  {user?.fullName || 'Verified Candidate'}
                </Text>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              </View>
              <Text style={styles.userPhone}>{phoneNumber}</Text>
              <Text style={styles.userRole}>Tech & Site Operations • Pune / Mumbai</Text>
            </View>
          </View>

          {/* Quick Metrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>1</Text>
              <Text style={styles.metricLabel}>Skill Reel</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>3</Text>
              <Text style={styles.metricLabel}>Applications</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>100%</Text>
              <Text style={styles.metricLabel}>Free Forever</Text>
            </View>
          </View>

          {/* PRD Section 6: Reels-First Feed Preview */}
          <View style={styles.sectionHeader}>
            <Ionicons name="videocam" size={20} color="#a855f7" />
            <Text style={styles.sectionTitle}>Reels-First Job Feed (PRD Section 6)</Text>
          </View>

          <View style={styles.reelPreviewCard}>
            <View style={styles.reelBadge}>
              <Text style={styles.reelBadgeText}>9:16 Vertical Reel</Text>
            </View>
            <Text style={styles.reelTitle}>Full-Stack & Drone Survey Demonstration</Text>
            <Text style={styles.reelCompany}>CloudScale Tech & Infrastructure • Pune</Text>
            <View style={styles.reelStatsRow}>
              <Text style={styles.reelStat}>👁 5.2k views</Text>
              <Text style={styles.reelStat}>❤️ 340 likes</Text>
              <Text style={styles.reelStat}>💼 1-Tap Apply</Text>
            </View>
          </View>

          {/* PRD Section 8: Search Jobs Preview */}
          <View style={styles.sectionHeader}>
            <Ionicons name="briefcase" size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Open Vacancies Near You</Text>
          </View>

          <View style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>CAD / Total Station Civil Engineer</Text>
              <Text style={styles.jobSalary}>₹35k - ₹45k/mo</Text>
            </View>
            <Text style={styles.jobLocation}>Swaraj Infrastructure • Chakan, Pune</Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>One-Tap Apply</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SignedIn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#9333ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  appName: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
  },
  appSub: {
    color: '#a1a1aa',
    fontSize: 11,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  signOutText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#27272a',
    padding: 16,
    marginBottom: 16,
    gap: 14,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#c084fc',
    fontSize: 22,
    fontWeight: 'bold',
  },
  verifiedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#18181b',
  },
  userInfo: {
    flex: 1,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  userPhone: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  userRole: {
    color: '#a1a1aa',
    fontSize: 11,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#18181b',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#27272a',
    padding: 12,
    alignItems: 'center',
  },
  metricValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  metricLabel: {
    color: '#a1a1aa',
    fontSize: 10,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    marginTop: 6,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  reelPreviewCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3b0764',
    padding: 16,
    marginBottom: 16,
  },
  reelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#9333ea',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  reelBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reelTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  reelCompany: {
    color: '#a1a1aa',
    fontSize: 12,
    marginBottom: 12,
  },
  reelStatsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  reelStat: {
    color: '#d4d4d8',
    fontSize: 11,
  },
  jobCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    padding: 16,
    marginBottom: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  jobTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  jobSalary: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobLocation: {
    color: '#a1a1aa',
    fontSize: 11,
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },
});
