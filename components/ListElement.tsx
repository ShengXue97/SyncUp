import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Image } from '@rneui/base';
import { Divider } from '@rneui/themed';

const BASE_URI = 'https://source.unsplash.com/random?sig=';

export default function App() {
    return (
        <>
            <View style={styles.container}>
                <Image
                    source={{ uri: BASE_URI + 1 }}
                    containerStyle={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <View style={styles.textContainer}>
                    <View style={styles.horizontalContainer}>
                        <Text
                            style={styles.textHeader}
                        >
                            Hiking Group
                        </Text>
                        <Text
                            style={styles.textTime}
                        >
                            8m ago
                        </Text>
                    </View>

                    <Text
                        style={styles.textBody}
                    >
                        You: No worries, let us know when you reach!
                    </Text>
                </View>
            </View>
            <Divider />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    textContainer: {
        flex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textTime: {
        fontSize: 10,
        fontWeight: "normal",
    },
    textHeader: {
        fontSize: 18,
        fontWeight: "bold",
    },
    textBody: {
        fontSize: 15,
    },
});
