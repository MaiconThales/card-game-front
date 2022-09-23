import { CardDTO } from "../card";

export interface DeckDTO {
    id: number;
    nameDeck: string;
    cards: CardDTO[];
}