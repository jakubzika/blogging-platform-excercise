import { AppActionType, TESTING_ACTION } from './types'

export function testingAction(msg: string): AppActionType {
    return {
        type: TESTING_ACTION,
        payload: msg,
    }
}
