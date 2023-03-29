export interface AppContext{
    user: string | null,
    signup: (email:string, password:string) => void
    login: (email:string, password:string) => void
    logout: () => void,

}