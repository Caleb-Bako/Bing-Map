import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Categories from '../../components/categories';
// import SearchResults from './SearchResults';
import Entypo from '@expo/vector-icons/Entypo';
import { supabase } from '../../components/utils/SupaConfig';
import SearchResults from './Places';

export default function SearchOverlay({currentIndex}) {
  const [activeCategory, setActiveCategory] = useState('Classroom');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // const navigation = useNavigation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 0) {
        const { data, error } = await supabase
          .from('places') 
          .select('*')
          .ilike('name', `%${searchQuery}%`);

        if (error) {
          console.error(error);
        } else {
          setSearchResults(data);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    // setMeals(category);
  };

  const handleSearchSelect = (place) => {
    setSearchQuery(place.name);
    setSearchResults([]);
    // Navigate to the place details page
    // navigation.navigate('PlacesDetail', { ...place});
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style='dark'/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ paddingVertical: 14,paddingHorizontal: 10 }}
      >
      {searchResults.length > 0 && (currentIndex === -1 || currentIndex === 0) && (
          <View style={styles.suggestionsContainer}>
            {searchResults.map((result, index) => (
              <TouchableOpacity key={index} onPress={() => handleSearchSelect(result)}>
                <Text style={styles.suggestionText}>{result.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* Searchbar */}
        {(currentIndex === -1 || currentIndex === 0) &&(
          <View style={styles.searchBarContainer}>
                 <TextInput
                   placeholder='Find any place'
                   placeholderTextColor={'gray'}
                   style={styles.searchInput}
                   value={searchQuery}
                   onChangeText={setSearchQuery}
                 />
                   <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                    <Entypo name="magnifying-glass" size={hp(2.7)} color="black" />
                   </TouchableOpacity>
               </View>
        )}
    
        {/* Greetings */}
        <View style={styles.greetingsContainer}>
          <Text style={styles.textNeutral600}>Hello, Binghamite!</Text>
          <View>
            <Text style={styles.fontSemibold}>Get directions to any place,</Text>
          </View>
          <Text style={styles.fontSemibold}>
            stay at <Text style={styles.textAmber400}>home</Text>
          </Text>
        </View>
          {/* Searchbar */}
            {(currentIndex === 1 || currentIndex === 2) && (
              <View style={styles.searchBarContainer}>
                 <TextInput
                   placeholder='Find any place'
                   placeholderTextColor={'gray'}
                   style={styles.searchInput}
                   value={searchQuery}
                   onChangeText={setSearchQuery}
                 />
                   <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                    <Entypo name="magnifying-glass" size={hp(2.7)} color="black" />
                   </TouchableOpacity>
               </View>
            )}
                {/* Search Suggestions */}
                {searchResults.length > 0 && (currentIndex === 2 || currentIndex === 1) && (
                  <View style={styles.suggestionsContainer}>
                    {searchResults.map((result, index) => (
                      <TouchableOpacity key={index} onPress={() => handleSearchSelect(result)}>
                        <Text style={styles.suggestionText}>{result.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
        {/* Categories */}
        <View>
          <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
        </View>
        
        {/* LowerDeck */}
        <View>
          <SearchResults activeCategory={activeCategory}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: 4,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 6,
  },
  searchInput: {
    fontSize: hp(1.7),
    flex: 1,
    fontSize: 16,
    marginBottom: 1,
    paddingLeft: 12,
    letterSpacing: 1,
  },
  clearButton: {
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 12,
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  suggestionText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greetingsContainer: {
    marginHorizontal: 4,
    marginBottom: 4,
    marginTop: 4,
    paddingVertical: 8,
  },
  textNeutral600: {
    fontSize: hp(1.7),
    color: '#666666',
  },
  fontSemibold: {
    fontSize: hp(3.8),
    fontWeight: '600',
    color: '#666666',
  },
  textAmber400: {
    color: '#FFCA28',
  },
});
