import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '@rneui/themed';
import ListElement from '../components/ListElement';
import React, { useState } from 'react';

const groups = [
    {
        id: 1,
        imageUri: 'https://cdn.britannica.com/94/125794-050-FB09B3F4/Hikers-Gore-Range-Mountains-Denver.jpg',
        title: 'Hiking Group',
        time: '8m ago',
        lastUser: 'You',
        lastMessage: 'No worries, let us know when you reach!',
    },
    {
        id: 2,
        imageUri: 'https://uploads-ssl.webflow.com/5732511283fb5b4c17492b27/5fa94c4750bcdb4315080384_Tennis_Racket_and_Balls.jpg',
        title: 'Tennis Group',
        time: '20m ago',
        lastUser: 'Peter',
        lastMessage: 'Do y\'all want to have dinner after our tennis session?',
    },
    {
        id: 3,
        imageUri: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/327/327086/a-woman-doing-the-bow-yoga-pose.jpg',
        title: 'Yoga Group',
        time: '32m ago',
        lastUser: 'Rebecca',
        lastMessage: 'It\'s my first time trying out yoga, pls guide me along 😊',
    },
    {
        id: 4,
        imageUri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/high-protein-dinners-slow-cooker-meatballs-image-5a04d02.jpg?quality=90&resize=500,454',
        title: 'Dinner Group',
        time: '32m ago',
        lastUser: 'Isaac',
        lastMessage: 'This restaurant looks fancy',
    }
]
export default function App() {
    const [search, setSearch] = useState("");
    const [filteredGroups, setFilteredGroups] = useState(groups);

    const updateSearch = (search) => {
        setSearch(search);
        setFilteredGroups(groups.filter(group => group.title.toLowerCase().includes(search.toLowerCase())));
    };

    return (
        <>
            <SearchBar
                round={true}
                lightTheme={true}
                placeholder="Search group name..."
                onChangeText={updateSearch}
                value={search}
            />

            <View style={styles.container}>
                {filteredGroups.map((group) => (
                    <ListElement
                        key={group.id}
                        imageUri={group.imageUri}
                        title={group.title}
                        time={group.time}
                        lastUser={group.lastUser}
                        lastMessage={group.lastMessage}
                    />
                ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
});
