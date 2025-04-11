import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { images, numberImages } from '../../images';
import ImageModal from '../../commonComponents/FullScreenImagePopup';
import { styles } from './styles';
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
    sixer: boolean;
};

const enum TeamType {
    PERSON = 'PERSON',
    BOT = 'BOT',
    NONE = 'NONE'
}

type Props = {
    navigation: any;
}

const GamePlayScreen = ({navigation}: Props) => {

    const [time, setTime] = useState(10);
    const [userInputNumber, setUserInputNumber] = useState<number>();
    const [target, setTarget] = useState<number | null>(null);
    const [secondInningScore, setSecondInningScore] = useState<number>(0);
    const [showBattingStart, setShowBattingStart] = useState(true);
    const [battingTeam, setBattingTeam] = useState<TeamType>(TeamType.PERSON)
    const [matchWinner, setMatchWinner] = useState<TeamType>(TeamType.NONE)

    const GAME_DEFAULT_STATE = {
        numberPressed: null,
        botNumberPressed: null,
        scoreList: [],
        botScoreList: [],
        ballsBowled: 0,
        isOut: false,
        inningsOver: false,
        matchOver: false,
        sixer: false,
    }
    const [gameState, setGameState] = useState<GameState>(GAME_DEFAULT_STATE)
    const interValRef = useRef<any>("");
    
    useEffect(() => {
        interValRef.current = setInterval(() => {
            setTime(handleTimeSet)
        }, 1000);

        setTimeout(() => {
            setShowBattingStart(false);
        }, 500);

        return () => {
            if (interValRef.current) clearInterval(interValRef.current);
          };
    },[]);

    useEffect(() => {
        const { inningsOver, scoreList, isOut, botScoreList, matchOver, sixer} = gameState;
        if(scoreList.length==6 && !inningsOver) {
            // setGameState((prevState) => ({...prevState, inningsOver: true}))
            setTimeout(() => {
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
        const {inningsOver}  = gameState
        if(!inningsOver && target != null){
            setGameState((prevState) => ({...prevState, isOut: false, inningsOver: true}))
        }
        if(target != null){
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
                isOut,
                sixer: !isOut && value == 6
            }))
        } else if(battingTeam == TeamType.BOT) {
            setGameState((prevState) => ({
                ...prevState,
                numberPressed: randomNumber,
                ballsBowled: prevState.ballsBowled + 1,
                botScoreList: !isOut ? [...prevState.botScoreList, randomNumber]: [...prevState.botScoreList],
                botNumberPressed: value,
                isOut,
                sixer: !isOut && randomNumber == 6,
                matchOver: isOut
            }))
            setSecondInningScore((currentScore) => isOut? currentScore: currentScore + randomNumber)
        }
        setTime(10);
        setUserInputNumber(value)
    }


    const handleTimeSet = (prevTime: number) => {
        if(prevTime == 0) return 0;
        if (prevTime === 1) {
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

    const renderBallsView = () => {
        const {scoreList, botScoreList} = gameState;
        let scores = battingTeam == TeamType.PERSON ? scoreList: botScoreList;

        const items = Array.from({ length: 6 }, (_, index) => {
            return index < scores.length ? scores[index] : undefined;
        });

        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{width: 10, backgroundColor: 'yellow', borderRadius: 8, marginEnd: 8}} />
                <View style={[styles.gridContainer]}>
                {items.map((item, index) => (
                    <Image key={index} style={[styles.item, !item && styles.faded]} source={images.ball} />
                ))}
                </View>
            </View>
        )
    }
    const renderRunsView =() => {
        const {scoreList, botScoreList} = gameState;
        let scores = battingTeam == TeamType.PERSON ? scoreList: botScoreList;

        const items = Array.from({ length: 6 }, (_, index) => {
            return index < scores.length ? scores[index] : undefined;
        });

        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{width: 10, backgroundColor: 'red', borderRadius: 8, marginEnd: 8}} />
                <View style={[styles.gridContainer]}>
                {items.map((item, index) => (
                    <View key={index} style={[styles.item, item ? styles.greenCircleFilled: styles.blackCircle]}>
                        <Text style={{color: 'white', fontSize: 12}}>{item}</Text>
                    </View>
                ))}
                </View>
            </View>
        )
    }

    const renderBallAndScoreView = () => {
        return (
          <View style={styles.ballScoreContainer}>
            {battingTeam == TeamType.PERSON ? (
                <>
                    {renderRunsView()}
                    {renderBallsView()}
                </>

            ): (
                <>
                    {renderBallsView()}
                    {renderRunsView()}
                </>
            )}
          </View>
        );
      };


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
                    <Text style={styles.inputText}>{userIsBatting? "Your input": "Bot's input"}</Text>
                </View>
                <View>
                    <View style={[styles.roundTime, {borderColor: 'white'}]}>
                        <Text style={styles.timerText}>{gameState.botNumberPressed ?? "--"}</Text>
                    </View>
                    <Text style={styles.inputText}>{userIsBatting? "Bot's input": "Your input"}</Text>
                </View>
            </View>
        )
    }

    return (
        <ImageBackground
            resizeMode="cover"
            style={styles.background}
            source={images.background}>
            <SafeAreaView style={{justifyContent: 'space-between', flex: 1}}>
                <View>
                    {renderBallAndScoreView()}
                    {renderHandGestureView()}
                    {renderTimerView}
                </View>
                <View>
                    {numberButton}
                </View>

                <ImageModal visible={gameState.isOut} imageSource={images.out}  />
                <ImageModal centerText={target?.toString()} visible={gameState.inningsOver} imageSource={images.game_defend}  />
                <ImageModal visible={showBattingStart} imageSource={images.batting}  />
                <ImageModal navigation={navigation} retry visible={matchWinner == TeamType.PERSON} imageSource={images.you_won}  />
                <ImageModal navigation={navigation} retry centerText='You lost' visible={matchWinner == TeamType.BOT} />
            </SafeAreaView>
        </ImageBackground>
    );
};
export default GamePlayScreen;
