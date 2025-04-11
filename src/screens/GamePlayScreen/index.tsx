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
    ballsBowled: number;
    isOut: boolean;
    inningsOver: boolean;
    battingStart: boolean;
  };

const GamePlayScreen = () => {

    const [time, setTime] = useState(10);
    const [userInputNumber, setUserInputNumber] = useState<number>();
    // const [showImageModal, setShowImgeModal] = useState(false);
    const [userIsBatting, setUserIsBatting] = useState(true);
    const [target, setTarget] = useState<number>(0);
    // const [showBattingStart, setShowBattingStart] = useState(true);


    // const [scoreList, setScoreList]  = useState(new Array(6));
    const GAME_DEFAULT_STATE = {
        numberPressed: null,
        botNumberPressed: null,
        scoreList: [],
        ballsBowled: 0,
        isOut: false,
        inningsOver: false,
        battingStart: true, 
    }
    const [gameState, setGameState] = useState<GameState>(GAME_DEFAULT_STATE)
    const interValRef = useRef<any>("");
    
    useEffect(() => {
        interValRef.current = setInterval(() => {
            console.log("** interval")
            setTime(handleTimeSet)
        },1000)

        return () => {
            if (interValRef.current) clearInterval(interValRef.current);
          };
    },[]);

    // useEffect(() => {
    //     if(showImageModal) {
    //         setTimeout(() => {
    //             setShowImgeModal(false)
    //         }, 4000)
    //     }
    // }, [showImageModal]);

    useEffect(() => {
        const { inningsOver, scoreList, isOut, battingStart } = gameState;
        if(scoreList.length==6 && !inningsOver) {
            // setGameState((prevState) => ({...prevState, inningsOver: true}))
            setTimeout(() => {
                setUserIsBatting(false)
            }, 0)
        }
        if(isOut) {
            // if(!inningsOver){
            //     setTimeout(() => {
            //         setGameState((prevState) => ({...prevState, inningsOver: true, isOut: false}))
            //     }, 2000);
            // }
            if(userIsBatting){
                setTimeout(() => {
                    setUserIsBatting(false)
                }, 4000)
            }
        }
        if(battingStart){
            setTimeout(() => {
                setGameState((prevState) => ({...prevState, battingStart: false}))
            }, 500)
        }
        console.log("** gamestate", gameState);

    }, [gameState, gameState.isOut, gameState.inningsOver]);

    useEffect(() => {
        const { inningsOver, scoreList, isOut } = gameState;
        if(isOut) {

        }
    }, [gameState.isOut])


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
        setTarget(currentGameState.scoreList.reduce((prev, curr) => prev + curr, 0));
        setGameState(GAME_DEFAULT_STATE);
        setTime(10);
        console.log("** inside user is batting ", userIsBatting)
    }, [userIsBatting])

    useEffect(() => {
        const {inningsOver}  = gameState
        if(!inningsOver && target!=0){
            setGameState((prevState) => ({...prevState, inningsOver: true}))
        }
    }, [target])



    const getRandomNumber = () => {
        return Math.floor(Math.random() * 6) + 1;
    }

    const handleOnNumberPress = (value: number) => {
        console.log("** pressed",value)
        const botNumber = 5
        const isOut = botNumber == value;
        setGameState((prevState) => ({
            ...prevState,
            numberPressed: value,
            ballsBowled: prevState.ballsBowled + 1,
            scoreList: [...prevState.scoreList, value],
            botNumberPressed: botNumber,
            isOut
        }))
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
                    isOut: true
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
        return (
            <View style={styles.handGestureContainer}>
            <View style={[styles.roundTime, {borderColor: 'white'}]}>
                <Text style={styles.timerText}>{gameState.numberPressed?? "--"}</Text>
            </View>
                <View style={[styles.roundTime, {borderColor: 'green'}]}>
                    <Text style={styles.timerText}>{gameState.botNumberPressed ?? "--"}</Text>
                </View>
            </View>
        )
    }

    const renderScoreList = () => {
        const scoreList = gameState.scoreList;
        return (
            <View>
                {scoreList?.map((score) =>{
                    return (
                        <Text style={{color: 'white'}}>{`Current score is ${score}`}</Text>
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
                {renderTimerView}
                {numberButton}
         
                <ImageModal visible={gameState.isOut} imageSource={images.out}  />
                <ImageModal centerText={target?.toString()} visible={gameState.inningsOver} imageSource={images.game_defend}  />
                <ImageModal visible={gameState.battingStart} imageSource={images.batting}  />

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
    }
});
