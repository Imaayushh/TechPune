import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';

const { width } = Dimensions.get('window');

// Reusable Animated Button Wrapper
const AnimatedPressable = ({ children, onPress, style, activeOpacity = 0.8 }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export type CoursesProps = {
  onBack: () => void;
};

export default function Courses({ onBack }: CoursesProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const currentCourses = [
    {
      id: '1',
      title: 'Advanced Data Structures',
      progress: 65,
      lessonsLeft: 4,
      instructor: 'Dr. Sarah Chen'
    },
    {
      id: '2',
      title: 'UI/UX Design Masterclass',
      progress: 30,
      lessonsLeft: 12,
      instructor: 'Alex Miller'
    }
  ];

  const categories = [
    { name: 'Development', count: 24, icon: 'terminal-solid' },
    { name: 'Design', count: 12, icon: 'star-solid' },
    { name: 'Data Science', count: 8, icon: 'shield-check' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AnimatedPressable onPress={onBack} style={styles.backBtn}>
          <Heroicon name="chevron-left" size={24} color="#1a1c1c" />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>LEARNING CENTER</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Progress Overview */}
          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>Keep Learning!</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Active Courses</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>18</Text>
                <Text style={styles.statLabel}>Lessons Done</Text>
              </View>
            </View>
          </View>

          {/* Categories */}
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.name} style={styles.categoryCard}>
                <View style={styles.categoryIcon}>
                  <Heroicon name={cat.icon} size={20} color="#1a1c1c" />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryCount}>{cat.count} Courses</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Continue Learning */}
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          {currentCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseInstructor}>by {course.instructor}</Text>
                </View>
                <Text style={styles.lessonsLeft}>{course.lessonsLeft} left</Text>
              </View>
              
              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
                </View>
                <Text style={styles.progressPercent}>{course.progress}%</Text>
              </View>

              <TouchableOpacity style={styles.resumeBtn}>
                <Text style={styles.resumeBtnText}>Resume Lesson</Text>
                <Heroicon name="chevron-right" size={16} color="#ffffff" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </Animated.View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: 1.5,
    color: '#1a1c1c',
  },
  scrollContent: {
    padding: 20,
  },
  overviewCard: {
    backgroundColor: '#1a1c1c',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'ClashDisplay-Bold',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'ClashDisplay-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#9a9a9a',
    fontFamily: 'Inter-Medium',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'CabinetGrotesk-Bold',
    color: '#1a1c1c',
    marginBottom: 16,
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    width: 130,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  courseInfo: {
    flex: 1,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
  },
  lessonsLeft: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
    backgroundColor: '#f5f5f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    height: 24,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f5f5f7',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1a1c1c',
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
    width: 30,
  },
  resumeBtn: {
    backgroundColor: '#1a1c1c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  resumeBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
});
