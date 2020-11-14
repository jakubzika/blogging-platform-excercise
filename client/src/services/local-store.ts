// local storage interfacing
class LocalStoreService {
    isStoredToken(): boolean {
        const value = localStorage.getItem('user-token')
        return value !== null
    }

    getToken(): string | null {
        return localStorage.getItem('user-token')
    }

    setToken(token: string) {
        localStorage.setItem('user-token', token)
    }

    clearToken(token: string) {
        localStorage.removeItem('user-token')
    }
}

const localStoreService = new LocalStoreService()
export default localStoreService
