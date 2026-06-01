import { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Heroicon, type IconName } from './Heroicon';
import PageHeader from './components/PageHeader';
import SectionHeader from './components/SectionHeader';
import { useFadeIn } from './hooks/useFadeIn';
import ActionButton from './components/ActionButton';
import Card from './components/Card';
import ProgressBar from './components/ProgressBar';

const { width } = Dimensions.get('window');

export default function Courses() {
  const navigation = useNavigation();
  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 10 && Math.abs(g.dx) > Math.abs(g.dy) && g.x0 < 60 && g.dx > 0,
      onPanResponderRelease: (_, g) => { if (g.dx > 120) navigation.goBack(); },
    }),
  ).current;

  const currentCourses = [
    { id: '1', title: 'Advanced Data Structures', progress: 65, lessonsLeft: 4, instructor: 'Dr. Sarah Chen' },
    { id: '2', title: 'UI/UX Design Masterclass', progress: 30, lessonsLeft: 12, instructor: 'Alex Miller' },
  ];

  const categories: { name: string; count: number; icon: IconName }[] = [
    { name: 'Development', count: 24, icon: 'terminal' },
    { name: 'Design', count: 12, icon: 'star' },
    { name: 'Data Science', count: 8, icon: 'shield-check' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        <PageHeader title="LEARNING CENTER" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
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

            <SectionHeader title="Browse Categories" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {categories.map((cat) => (
                <TouchableOpacity key={cat.name} style={styles.categoryCard}>
                  <View style={styles.categoryIcon}><Heroicon name={cat.icon} size={20} color="#1a1c1c" /></View>
                  <Text style={styles.categoryName}>{cat.name}</Text>
                  <Text style={styles.categoryCount}>{cat.count} Courses</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <SectionHeader title="Continue Learning" />
            {currentCourses.map((course) => (
              <TouchableOpacity key={course.id} activeOpacity={0.9} style={{ marginBottom: 16 }}>
                <Card padding={16}>
                  <View style={styles.courseHeader}>
                    <View style={styles.courseInfo}>
                      <Text style={styles.courseTitle}>{course.title}</Text>
                      <Text style={styles.courseInstructor}>by {course.instructor}</Text>
                    </View>
                    <Text style={styles.lessonsLeft}>{course.lessonsLeft} left</Text>
                  </View>
                  <ProgressBar percent={course.progress} showLabel />
                  <ActionButton label="Resume Lesson" icon="chevron-right" style={{ marginTop: 16 }} />
                </Card>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  scrollContent: { padding: 20 },
  overviewCard: { backgroundColor: '#1a1c1c', borderRadius: 24, padding: 24, marginBottom: 24 },
  overviewTitle: { fontSize: 20, color: '#ffffff', fontFamily: 'ClashDisplay-Bold', marginBottom: 20 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1 },
  statValue: { fontSize: 24, color: '#ffffff', fontFamily: 'ClashDisplay-Bold' },
  statLabel: { fontSize: 12, color: '#9a9a9a', fontFamily: 'Inter-Medium' },
  statDivider: { width: 2, height: 30, backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 20 },
  categoryScroll: { marginBottom: 24 },
  categoryCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, width: 130, marginRight: 12 },
  categoryIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#f5f5f7', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  categoryName: { fontSize: 14, fontFamily: 'Inter-Bold', color: '#1a1c1c', marginBottom: 4 },
  categoryCount: { fontSize: 11, fontFamily: 'Inter-Medium', color: '#666666' },
  courseHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  courseInfo: { flex: 1, marginRight: 12 },
  courseTitle: { fontSize: 16, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', marginBottom: 4 },
  courseInstructor: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#666666' },
  lessonsLeft: { fontSize: 11, fontFamily: 'Inter-Bold', color: '#1a1c1c', backgroundColor: '#f5f5f7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, height: 24 },
});
