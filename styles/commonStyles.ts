import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    backgroundColor: 'white',
  },

  // Text
  sectionTitle: {
    fontSize: 20,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    padding: 15,
  },
  subtext: {
    fontSize: 12,
    color: '#514f4fff',
  },

  // Button
  button: {
    padding: 15,
    marginVertical: 8,
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    marginBottom: 30,
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  closeButtonText: {
    fontWeight: '600',
    color: '#333',
  },

  // Cards
  card: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },

  // Table
  table: {
    margin: 16,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    padding: 8,
    borderWidth: 1,
    minWidth: 80,
    textAlign: 'center',
  },
  header: {
    padding: 8,
    minWidth: 80,
  },

  // Accordion
  accordionButton: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    margin: 10,
  },
  accordionContent: {
    padding: 10,
    marginLeft: 10,
  },

  // Star Rating
  starRow: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  star: {
    fontSize: 24,
    marginHorizontal: 4,
  },

  // Slider / Progress Bar
  sliderWrapper: {
    marginVertical: 20,
  },
  slider: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 20,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
  },
  sliderText: {
    fontSize: 18,
    textAlign: 'center',
  },
  sliderHint: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#ccc',
    margin: 10,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#4caf50',
  },

  // Media
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  animatedImage: {
    width: 200,
    height: 200,
  },

  // Nav Bar Demo
  navDemoScrollContent: {
    paddingBottom: 24,
  },
  testingInstructionsPanel: {
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#fff',
  },
  iosOnlyWarningBanner: {
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8a6d00',
    backgroundColor: '#fff4cc',
  },
  iosOnlyWarningText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5c4600',
    textAlign: 'center',
  },
  scrollTestCard: {
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b7b7b7',
    backgroundColor: '#ffffff',
  },
  scrollTestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  scrollTestMeta: {
    fontSize: 14,
    color: '#444',
  },
  glassTransparencyTestBlock: {
    flexDirection: 'row',
    height: 500,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 15,
    marginBottom: 24,
  },
  glassTransparencyStripeRed: {
    flex: 1,
    backgroundColor: '#e2263d',
  },
  glassTransparencyStripeOrange: {
    flex: 1,
    backgroundColor: '#ff9500',
  },
  glassTransparencyStripeBlue: {
    flex: 1,
    backgroundColor: '#0a84ff',
  },
  glassTransparencyStripeMagenta: {
    flex: 1,
    backgroundColor: '#bf5af2',
  },
  glassTransparencyStripeTeal: {
    flex: 1,
    backgroundColor: '#00c7be',
  },
});

export default commonStyles;
