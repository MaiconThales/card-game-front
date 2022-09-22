import { UserDTO } from "../user";

export interface MatchDTO {
    id: number;
    player1: UserDTO,
    player2: UserDTO
}