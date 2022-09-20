export interface JwtResponseDTO {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
    language: string;
}