import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import TypeWriterEffect from 'react-native-typewriter-effect';
import OpenAI from 'react-native-openai';
import {useWindowDimensions} from 'react-native';
import { REACT_APP_OPENAI_KEY } from '@env';


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatGPT() {
  
  const windowHeight = useWindowDimensions().height;
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [response, setResponse] = useState(null); // Store API response
  const [text, setText] = useState(
    'Ask anything related to stock market we will response to you...',
  );

  async function EventHandler() {
    setIsLoading(true);

    try {

      const gptQuery = `Act as a stock market news reporter and gives me the news related to the query: ${searchText}`;

      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            messages: [{role: 'user', content: gptQuery}],
            model: 'gpt-3.5-turbo', // Or the model you prefer
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const stockNews = data.choices[0]?.message?.content;
      setText(stockNews)
      
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = text => {
    setSearchText(text);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            marginHorizontal: 4,
            paddingHorizontal: 10,
            color: 'black',
            fontSize: 20,
          }}
          onChangeText={handleChange}
          value={searchText}
          placeholder="Enter your query..."
          placeholderTextColor="black"
        />
        <Pressable
          style={{justifyContent: 'center', alignItems: 'center',marginBottom:15}}
          onPress={EventHandler}
          disabled={isLoading}>
          <Text
            style={{
              width: 200,
              backgroundColor: isLoading ? 'gray' : 'red',
              paddingVertical: 10,
              fontSize: 18,
              fontWeight: 600,
              textAlign: 'center',
              borderRadius: 5,
              marginTop: 10,
            }}>
            {isLoading ? 'Loading...' : 'Search'}
          </Text>
        </Pressable>
        <ScrollView style={{height:windowHeight-200, paddingTop:10,paddingBottom:20}}>
        <TypeWriterEffect
          delay={1}
          style={{color: 'black', fontSize: 20 ,lineHeight:30}}
          content={text}
        />
        
        </ScrollView>
      </View>
      {response && (
        <Text style={{marginHorizontal: 15, marginTop: 10}}>{response}</Text>
      )}
    </View>
  );
}
