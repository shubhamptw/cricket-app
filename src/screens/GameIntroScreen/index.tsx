import React from 'react';
import { Button, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import GradientBackground from '../../commonComponents/GradientBackground';
import GradientButton from '../../commonComponents/GradientButton';
import { ScreenNames } from '../../navigation/screenMapping';
import { styles } from './styles';

type Props = {
    navigation: any;
}

const GameIntroScreen = ({navigation}: Props) => {
    const handleOnContinuePress = () => {
        navigation.replace(ScreenNames.GAME_PLAY_SCREEN)
    }

    const renderHowToPlay = (
        <View style={styles.bannerContainer}>
            <Text style={styles.textBanner}>{'How to play'}</Text>
        </View>
    )
    const renderTapButtons = (
        <View style={styles.tapButtonsContainer}>
            <Text style={styles.tapBtnText}>{'Tap the buttons to score runs'}</Text>
        </View>
    );

    const renderRulesSame = (
        <View style={styles.tapButtonsContainer}>
            <View>
                <View>
                    <Text style={styles.ruleText}>{'Same number: '}</Text>
                    <Text style={styles.ruleNeg}>{"You're out!"}</Text>
                </View>
            </View>
            <View>
            </View>
        </View>
    )

    const renderRulesDifferent = (
        <View style={styles.tapButtonsContainer}>
            <View>
                <View>
                    <Text style={styles.ruleText}>{'Different number: '}</Text>
                    <Text style={styles.rulePos}>{"You score runs"}</Text>
                </View>
            </View>
            <View>
            </View>
        </View>
    )

    const renderOffer = (
        <View style={styles.tapButtonsContainer}>
        <Text style={styles.tapBtnText}>{'Be the highest scrorer & win signed RCB merch'}</Text>
    </View>
    )

    return (
        <GradientBackground >
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper}>
                    <View>
                        {renderHowToPlay}
                        {renderTapButtons}
                        <View style={styles.rulesContainer}>
                            {renderRulesSame}
                            {renderRulesDifferent}
                        </View>
                        {renderOffer}
                    </View>

                    <GradientButton
                        title="Start playing"
                        onPress={handleOnContinuePress}
                        style={styles.button}
                    />
                </View>
            </SafeAreaView>
        </GradientBackground>

    )
}
export default GameIntroScreen;