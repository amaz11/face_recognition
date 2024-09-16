import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";


interface AuthContextType {
    token: string;
    isAuthenticated: boolean;
    loading: boolean;
    setToken: Dispatch<SetStateAction<string>>;
    // setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    // setLoading: Dispatch<SetStateAction<boolean>>;
}
const defaultAuthValue: AuthContextType = {
    token: '',
    isAuthenticated: false,
    loading: false,
    setToken: () => { },
}

export const AuthContext = createContext<AuthContextType>(defaultAuthValue)

const AuthUser = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>('')
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const ls: Storage | null = typeof window !== 'undefined' ? window.localStorage : null
    useEffect(() => {
        const token = ls!.getItem('X_FR_token')
        if (token!?.length >= 15) {
            setToken(token!);
            setIsAuthenticated(true)
            setLoading(false)
        } else {
            setLoading(false)
            return
        }
    }, [])


    return <AuthContext.Provider value={{ token, isAuthenticated, loading, setToken }}>
        {children}
    </AuthContext.Provider>
}

export default AuthUser