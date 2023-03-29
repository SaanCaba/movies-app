export interface AppContext{
    user: string | null,
    signup: (email:string, password:string) => void
}