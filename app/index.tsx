import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

type Note = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
};

export default function Index() {
  const systemTheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const [manualDarkMode, setManualDarkMode] = useState(systemTheme === 'dark');

  const isDark = manualDarkMode;

  // STEEP DESIGN SYSTEM COLORS
  const theme = {
    background: isDark ? '#111315' : '#ffffff',
    surface: isDark ? '#1a1d21' : '#ffffff',
    fog: isDark ? '#1c1f24' : '#f7f7f8',
    warm: '#fbe1d1',
    text: isDark ? '#f5f5f5' : '#17191c',
    secondaryText: isDark ? '#b1b5bc' : '#4c4c4c',
    muted: '#777b86',
    border: isDark ? '#2a2f36' : '#ececec',
    accent: '#5d2a1a',
    button: '#17191c',
    buttonText: '#ffffff',
    placeholder: '#a3a6af',
  };

  const [screen, setScreen] = useState<'list' | 'editor'>('list');
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Product Strategy',
      content:
        'Review onboarding experience and simplify dashboard flows for better clarity.',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Ideas',
      content:
        'Explore warm editorial UI concepts inspired by modern productivity tools.',
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Reading Notes',
      content:
        'Typography and spacing create more perceived quality than visual complexity.',
      timestamp: new Date().toISOString(),
    },
  ]);

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, notes]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditId(null);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    if (editId) {
      const updatedNotes = notes.map((note) =>
        note.id === editId
          ? {
              ...note,
              title,
              content,
            }
          : note
      );

      setNotes(updatedNotes);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        timestamp: new Date().toISOString(),
      };

      setNotes((prev) => [newNote, ...prev]);
    }

    resetForm();

    setScreen('list');
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));

    if (editId === id) {
      resetForm();
      setScreen('list');
    }
  };

  const openEditor = (note?: Note) => {
    if (note) {
      setEditId(note.id);
      setTitle(note.title);
      setContent(note.content);
    } else {
      resetForm();
    }

    setScreen('editor');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {screen === 'list' ? (
        <>
          {/* HEADER */}

          <View style={styles.header}>
            <View>
              <Text
                style={[
                  styles.heroTitle,
                  {
                    color: theme.text,
                  },
                ]}>
                Notes
              </Text>

              <Text
                style={[
                  styles.heroSubtitle,
                  {
                    color: theme.secondaryText,
                  },
                ]}>
                Warm, crisp canvas for your thoughts.
              </Text>
            </View>

            <View style={styles.themeToggleContainer}>
              <Text
                style={[
                  styles.themeLabel,
                  {
                    color: theme.secondaryText,
                  },
                ]}>
                Dark
              </Text>

              <Switch value={isDark} onValueChange={setManualDarkMode} />
            </View>
          </View>

          {/* SEARCH */}

          <TextInput
            placeholder="Search notes..."
            placeholderTextColor={theme.placeholder}
            value={search}
            onChangeText={setSearch}
            style={[
              styles.searchInput,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />

          {/* NOTES */}

          <FlatList
            data={filteredNotes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingBottom: 140,
              paddingTop: 8,
            }}
            numColumns={isTablet ? 2 : 1}
            columnWrapperStyle={
              isTablet
                ? {
                    justifyContent: 'space-between',
                  }
                : undefined
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text
                  style={[
                    styles.emptyTitle,
                    {
                      color: theme.text,
                    },
                  ]}>
                  Your thoughts deserve a place.
                </Text>

                <Text
                  style={[
                    styles.emptySubtitle,
                    {
                      color: theme.secondaryText,
                    },
                  ]}>
                  Start capturing ideas, reflections, and plans.
                </Text>
              </View>
            }
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    styles.noteCard,
                    {
                      backgroundColor: theme.fog,
                      borderColor: theme.border,
                      width: isTablet ? '48%' : '100%',
                    },
                  ]}>
                  <Pressable
                    onPress={() => openEditor(item)}
                    style={({ pressed }) => [
                      styles.noteCardContent,
                      {
                        opacity: pressed ? 0.95 : 1,
                      },
                    ]}>
                    {/* Accent Line */}

                    <View
                      style={[
                        styles.accentLine,
                        {
                          backgroundColor: theme.accent,
                        },
                      ]}
                    />

                    <Text
                      style={[
                        styles.noteTitle,
                        {
                          color: theme.text,
                        },
                      ]}>
                      {item.title}
                    </Text>

                    <Text
                      numberOfLines={3}
                      style={[
                        styles.noteContent,
                        {
                          color: theme.secondaryText,
                        },
                      ]}>
                      {item.content}
                    </Text>

                    <Text
                      style={[
                        styles.noteTimestamp,
                        {
                          color: theme.muted,
                        },
                      ]}>
                      {new Date(item.timestamp).toLocaleDateString()}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleDelete(item.id)}
                    style={({ pressed }) => [
                      styles.cardDeleteButton,
                      {
                        borderColor: theme.accent,
                        backgroundColor: theme.surface,
                        opacity: pressed ? 0.88 : 1,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.cardDeleteButtonText,
                        {
                          color: theme.accent,
                        },
                      ]}>
                      Delete
                    </Text>
                  </Pressable>
                </View>
              );
            }}
          />

          {/* FAB */}

          <Pressable
            onPress={() => openEditor()}
            style={({ pressed }) => [
              styles.floatingButton,
              {
                backgroundColor: theme.button,
                opacity: pressed ? 0.9 : 1,
              },
            ]}>
            <Text style={styles.floatingButtonText}>New Note</Text>
          </Pressable>
        </>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* IMAGE HEADER */}

          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200',
            }}
            style={styles.editorHeader}
            imageStyle={styles.editorHeaderImage}>
            <View style={styles.imageOverlay} />

            <Pressable
              onPress={() => {
                resetForm();

                setScreen('list');
              }}
              style={({ pressed }) => [
                styles.backButton,
                {
                  opacity: pressed ? 0.85 : 1,
                },
              ]}>
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>

            <Text style={styles.editorHeading}>
              {editId ? 'Edit your note' : 'Capture a new thought'}
            </Text>
          </ImageBackground>

          {/* FORM */}

          <View
            style={[
              styles.editorContainer,
              {
                backgroundColor: theme.background,
              },
            ]}>
            <TextInput
              placeholder="Note title"
              placeholderTextColor={theme.placeholder}
              value={title}
              onChangeText={setTitle}
              style={[
                styles.titleInput,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            <TextInput
              placeholder="Write your note here..."
              placeholderTextColor={theme.placeholder}
              multiline
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
              style={[
                styles.contentInput,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            {/* ACTIONS */}

            <View style={styles.actionsContainer}>
              <Pressable
                onPress={() => {
                  resetForm();

                  setScreen('list');
                }}
                style={({ pressed }) => [
                  styles.ghostButton,
                  {
                    borderColor: theme.text,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}>
                <Text
                  style={[
                    styles.ghostButtonText,
                    {
                      color: theme.text,
                    },
                  ]}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                style={({ pressed }) => [
                  styles.primaryButton,
                  {
                    backgroundColor: theme.button,
                    opacity: pressed ? 0.92 : 1,
                  },
                ]}>
                <Text style={styles.primaryButtonText}>
                  {editId ? 'Update Note' : 'Save Note'}
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 10,
  },

  // HEADER
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 24,
  },

  heroTitle: {
    fontSize: 44,
    lineHeight: 48,
    fontWeight: '400',
    letterSpacing: -1,
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
  },

  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },

  themeLabel: {
    marginRight: 10,
    fontSize: 14,
  },

  // SEARCH

  searchInput: {
    marginHorizontal: 24,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    marginBottom: 12,
  },

  // NOTES

  noteCard: {
    marginHorizontal: 0,
    marginBottom: 20,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 6,
  },

  accentLine: {
    width: 52,
    height: 4,
    borderRadius: 999,
    marginBottom: 18,
  },

  noteTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '500',
    letterSpacing: -0.3,
    marginBottom: 10,
  },

  noteContent: {
    fontSize: 15,
    lineHeight: 24,
  },

  noteTimestamp: {
    marginTop: 20,
    fontSize: 14,
  },

  // EMPTY

  emptyContainer: {
    marginTop: 140,
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyTitle: {
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },

  emptySubtitle: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },

  // FAB

  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 999,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },

  floatingButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },

  // EDITOR

  editorHeader: {
    height: 260,
    padding: 24,
    justifyContent: 'space-between',
  },

  editorHeaderImage: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  backButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },

  editorHeading: {
    color: '#ffffff',
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -1,
    fontWeight: '400',
  },

  // FORM

  editorContainer: {
    flex: 1,
    padding: 24,
  },

  titleInput: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 18,
    marginBottom: 18,
  },

  contentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 16,
    lineHeight: 28,
    minHeight: 260,
  },

  // ACTIONS

  actionsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },

  ghostButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ghostButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },

  primaryButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },

  noteCardContent: {
    padding: 0,
  },

  cardDeleteButton: {
    marginTop: 18,
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },

  cardDeleteButtonText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
