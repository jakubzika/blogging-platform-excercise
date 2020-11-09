export const TESTING_ACTION = 'TESTING_ACTION'

interface TestingAction {
    type: typeof TESTING_ACTION
    payload: string
}

export type AppActionType = TestingAction
