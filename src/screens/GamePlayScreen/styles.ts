import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    numberButtonContainer: {
        flexDirection: 'row',
        margin: 16,
        flexWrap: 'wrap',
        justifyContent: 'center'

    },
    img: {
        height: 70,
        width: 70,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    roundTime: {
        borderRadius: 50,
        borderColor: 'maroon',
        borderWidth: 4,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    timerSub: {
        color: 'white',
        fontSize: 14,
        marginVertical: 8
    },
    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    handGestureContainer: {
        borderRadius: 16,
        marginHorizontal: 32,
        height: 200,
        borderWidth: 1,
        borderColor: 'gold',
        elevation: 10,
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    inputText: {
        color: 'white',
        marginVertical: 8
    },
    leftContainer: {
        flex: 0.5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rightContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 0.5
    },
    ballScoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        // backgroundColor: 'gray',
        borderRadius: 8,
        margin: 16
      },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 120,
        gap: 8,     
    },
    item: {
        width: 24,
        height: 24,
        margin: 4, // fallback for older RN instead of gap,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blackCircle: {
        borderRadius: 40,
        backgroundColor: 'black',
    },
    greenCircleFilled: {
        borderRadius: 40,
        backgroundColor: 'green'
    },
    faded: {
        opacity: 0.3
    }
});