import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flex: 1,
    },
    wrapper: {
        marginHorizontal: 24,
        justifyContent: 'space-between',
        flex: 1
    },
    tapButtonsContainer: {
        backgroundColor: 'black',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8
    },
    tapBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    rulesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ruleText: {
        fontWeight: '500',
        fontSize: 14,
        color: 'white'
    },
    ruleNeg: {
        fontWeight: '500',
        fontSize: 14,
        color: 'red'
    },
    rulePos: {
        fontWeight: '500',
        fontSize: 14,
        color: 'lightgreen'
    },
    colorGold: {
        color: 'gold'
    },
    button: {
        marginVertical: 16
    },
    textBanner: {
        color: 'gold',
        fontWeight: 'bold',
        fontSize: 40,
        alignSelf: 'center'
    },
    bannerContainer: {
        marginVertical: 36,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    }
})
