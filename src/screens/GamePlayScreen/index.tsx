import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { images, numberImages } from '../../images';
import ImageModal from '../../commonComponents/FullScreenImagePopup';
// import Rive, { RiveRef } from 'rive-react-native';

type GameState = {
    numberPressed: number | null;
    botNumberPressed: number | null;
    scoreList: number[];
    botScoreList: number[],
    ballsBowled: number;
    isOut: boolean;
    inningsOver: boolean;
    matchOver: boolean;
};

const enum TeamType {
    PERSON = 'PERSON',
    BOT = 'BOT',
    NONE = 'NONE'
}

const GamePlayScreen = () => {

    const [time, setTime] = useState(10);
    const [userInputNumber, setUserInputNumber] = useState<number>();
    const [target, setTarget] = useState<number | null>(null);
    const [secondInningScore, setSecondInningScore] = useState<number>(0);
    const [showBattingStart, setShowBattingStart] = useState(true);
    const [battingTeam, setBattingTeam] = useState<TeamType>(TeamType.PERSON)
    const [matchWinner, setMatchWinner] = useState<TeamType>(TeamType.NONE)

    // const [scoreList, setScoreList]  = useState(new Array(6));
    const GAME_DEFAULT_STATE = {
        numberPressed: null,
        botNumberPressed: null,
        scoreList: [],
        botScoreList: [],
        ballsBowled: 0,
        isOut: false,
        inningsOver: false,
        matchOver: false
    }
    const [gameState, setGameState] = useState<GameState>(GAME_DEFAULT_STATE)
    const interValRef = useRef<any>("");
    
    useEffect(() => {
        interValRef.current = setInterval(() => {
            console.log("** interval")
            setTime(handleTimeSet)
        },1000)

        setTimeout(() => {
            setShowBattingStart(false);
        }, 500)

        return () => {
            if (interValRef.current) clearInterval(interValRef.current);
          };
    },[]);

    useEffect(() => {
        const { inningsOver, scoreList, isOut, botScoreList, matchOver} = gameState;
        if(scoreList.length==6 && !inningsOver) {
            // setGameState((prevState) => ({...prevState, inningsOver: true}))
            setTimeout(() => {
                // setUserIsBatting(false)
                setBattingTeam(TeamType.BOT);
            }, 0)
        }
        if(botScoreList.length == 6 && !matchOver) {
            setTimeout(() => {
                setBattingTeam(TeamType.NONE);
            }, 0)
        }
        if(isOut) {
            if(battingTeam == TeamType.PERSON){
                setTimeout(() => {
                    setBattingTeam(TeamType.BOT);
                }, 4000)
            }
            if(battingTeam == TeamType.BOT) {
                setTimeout(() => {
                    setBattingTeam(TeamType.NONE);
                }, 1000)
            }
        }
        console.log("** gamestate", gameState);

    }, [gameState, gameState.isOut, gameState.inningsOver]);

    useEffect(() => {
        setTimeout(() => {
            setGameState((prevState) => ({
                ...prevState,
                numberPressed: null,
                botNumberPressed: null,
            }))
        }, 2000);
    }, [userInputNumber])


    useEffect(() => {
        const currentGameState  = gameState
        if(secondInningScore>(target ?? 0)){
            setBattingTeam(TeamType.NONE);
        }
    }, [secondInningScore])

    useEffect(() => {
        const currentGameState  = gameState;
        // match over
        if(battingTeam == TeamType.NONE){
            setGameState(GAME_DEFAULT_STATE);
            clearInterval(interValRef.current)
            let botScore = currentGameState.botScoreList.reduce((prev, curr) => prev + curr, 0)?? 0;
            if(botScore> (target?? 0)){
                setMatchWinner(TeamType.BOT)
            }else {
                setMatchWinner(TeamType.PERSON)
            }
        } else if(battingTeam == TeamType.BOT) {
            setTarget(currentGameState.scoreList.reduce((prev, curr) => prev + curr, 0) ?? 0);
        } 
    }, [battingTeam]);


    useEffect(() => {
        console.log("** taget", target)
        const {inningsOver}  = gameState
        if(!inningsOver && target!=null){
            setGameState((prevState) => ({...prevState, isOut: false, inningsOver: true}))
        }
        if(target!=null){
            setTimeout(() => {
                setGameState((prevState) => ({
                    ...GAME_DEFAULT_STATE,
                    scoreList: prevState.scoreList,
                    botScoreList: prevState.botScoreList
                }));
                setTime(10);
            }, 2000)
        }
    }, [target])



    const getRandomNumber = () => {
        return Math.floor(Math.random() * 6) + 1;
    }

    const handleOnNumberPress = (value: number) => {
        const randomNumber = getRandomNumber()
        const isOut = randomNumber == value;

        if(battingTeam == TeamType.PERSON){
            setGameState((prevState) => ({
                ...prevState,
                numberPressed: value,
                ballsBowled: prevState.ballsBowled + 1,
                scoreList: !isOut ? [...prevState.scoreList, value]: [...prevState.scoreList],
                botNumberPressed: randomNumber,
                isOut
            }))
        } else if(battingTeam == TeamType.BOT) {
            setGameState((prevState) => ({
                ...prevState,
                numberPressed: randomNumber,
                ballsBowled: prevState.ballsBowled + 1,
                botScoreList: !isOut ? [...prevState.botScoreList, randomNumber]: [...prevState.botScoreList],
                botNumberPressed: value,
                isOut,
                matchOver: isOut
            }))
            setSecondInningScore((currentScore) => isOut? currentScore: currentScore + randomNumber)
        }
        setTime(10);
        setUserInputNumber(value)
    }


    const handleTimeSet = (prevTime: number) => {
        console.log("** time", prevTime)
        if(prevTime == 0) return 0;
        if (prevTime === 1) {
            // clearInterval(interValRef.current); // Clear before state becomes 0
            if(!userInputNumber) {
                setGameState((prevState) => ({
                    ...prevState,
                    isOut: true,
                    matchOver: battingTeam == TeamType.BOT
                }))
            }
            return 0;
        }
        return prevTime - 1;
    }



    const renderBallAndScoreView = () => {
        return (
            <View>

            </View>
        )
    }



    const renderTimerView = (
        <View style={styles.timerContainer}>
            <View style={styles.roundTime}>
                <Text style={styles.timerText}>{time}</Text>
            </View>
            <Text style={styles.timerSub}>{'Pick a number before timer runs out'}</Text>
        </View>
    )

    const numberButton = (
        <View style={styles.numberButtonContainer}>
            {numberImages?.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => handleOnNumberPress(item.value)}>
                        <Image style={styles.img} source={item.imgSrc} />
                    </TouchableOpacity>
                )
            })}
        </View>
    )

    const renderHandGestureView = () => {

        const userIsBatting = battingTeam == TeamType.PERSON
        return (
            <View style={styles.handGestureContainer}>
                <View>
                    <View style={[styles.roundTime, {borderColor: 'white'}]}>
                        <Text style={styles.timerText}>{gameState.numberPressed?? "--"}</Text>
                    </View>
                    <Text style={styles.inputText}>{userIsBatting? "Your input": "Opponent input"}</Text>
                </View>
                <View>
                    <View style={[styles.roundTime, {borderColor: 'green'}]}>
                        <Text style={styles.timerText}>{gameState.botNumberPressed ?? "--"}</Text>
                    </View>
                    <Text style={styles.inputText}>{userIsBatting? "Opponent input": "Your input"}</Text>
                </View>
            </View>
        )
    }

    const renderScoreList = () => {
        const scoreList = gameState.scoreList;
        return (
            <View>
                {scoreList?.map((score, index) =>{
                    return (
                        <Text key={index} style={{color: 'white'}}>{`Your score is ${score}`}</Text>
                    )
                })}
            </View>
        )
    }

    const renderBotScoreList = () => {
        const scoreList = gameState.botScoreList;
        return (
            <View>
                {scoreList?.map((score, index) =>{
                    return (
                        <Text key={index} style={{color: 'white'}}>{`Bot score is ${score}`}</Text>
                    )
                })}
            </View>
        )
    }

    return (
        <ImageBackground
            resizeMode="cover"
            style={styles.background}
            source={images.background}>
            <SafeAreaView>
                <Text>{'Game play screen'}</Text>
                {renderHandGestureView()}
                {renderScoreList()}
                {renderBotScoreList()}
                {renderTimerView}
                {numberButton}
         
                <ImageModal visible={gameState.isOut} imageSource={images.out}  />
                <ImageModal centerText={target?.toString()} visible={gameState.inningsOver} imageSource={images.game_defend}  />
                <ImageModal visible={showBattingStart} imageSource={images.batting}  />
                <ImageModal visible={matchWinner == TeamType.PERSON} imageSource={images.you_won}  />
                <ImageModal centerText='You lost' visible={matchWinner == TeamType.BOT} />
            </SafeAreaView>
        </ImageBackground>
    );
};
export default GamePlayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        // justifyContent: 'center',
    },
    numberButtonContainer: {
        flexDirection: 'row',
        marginHorizontal: 24,
        flexWrap: 'wrap',
        justifyContent: 'center'

    },
    img: {
        height: 70,
        width: 70,
        marginHorizontal: 16,
        marginVertical: 8,
        // flex: 0.5
    },
    roundTime: {
        // padding: 16,
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
        marginHorizontal: 48,
        height: 200,
        // width: 260,
        borderWidth: 1,
        borderColor: 'gold',
        elevation: 10,
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24
        // alignSelf: 'center'
    },
    inputText: {
        color: 'white',
        marginVertical: 8
    }
});
