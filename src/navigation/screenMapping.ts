import GameIntroScreen from "../screens/GameIntroScreen";
import GamePlayScreen from "../screens/GamePlayScreen";


export const ScreenNames = {
    GAME_INTRO_SCREEN: "GameIntroScreen",
    GAME_PLAY_SCREEN: "GamePlayScreen",
}

export const screenMapping = [
    {
        screenName: ScreenNames.GAME_INTRO_SCREEN,
        screenComponent: GameIntroScreen
    },
    {
        screenName: ScreenNames.GAME_PLAY_SCREEN,
        screenComponent: GamePlayScreen
    }
]

