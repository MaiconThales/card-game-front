export interface SignupRequestDTO {
    username: string;
    email: string;
    role?: string[];
    password: string;
    language: string;
}