import AIHandler from "./AIHandler";
import { SwitchCurrentChatEvent } from "./ChatEvents";

class CardHandler {
    private static instance: CardHandler;

    // holds all the cards informatoin
    private _cards: Card[] = [];
    private _currentCard: Card;

    public get currentCard(): Card {
        return this._currentCard;
    }

    public set currentCard(newCard: Card) {
        this._currentCard = newCard;
        new SwitchCurrentChatEvent().Dispatch();
    }
    
    constructor() {
        this.retrieveCards();
        this._currentCard = new Card();
    }

    /** Retreives the current instance of the CardHandler */
    public static getInstance(): CardHandler {
        if (!CardHandler.instance) {
            CardHandler.instance = new CardHandler();
        }

        return CardHandler.instance;
    }

    // Retrieves all the stored cards information from local storage
    public retrieveCards() {
        const storedCards = localStorage.getItem("cards");
        if (storedCards) {
            const parsedCards = JSON.parse(storedCards);

            // Convert parsed JSON back to a Map<MessageInfo, string>
            this._cards = parsedCards.map((cardData: any) => {
                // Convert the array of entries back to a Map
                const chatEntries = Array.isArray(cardData._chats) 
                    ? cardData._chats.map(
                        ([key, value]: [any, string]) => [new MessageInfo(key._id, key._userSent), value]
                    )
                    : []; // If _chats is not an array, fallback to an empty array to prevent errors

                return new Card(new Map(chatEntries), cardData._title);
            });
        }
    }

    // Saves all the stored cards information to local storage
    public saveCards(): void {
        const cardsToSave = this._cards.map(card => ({
            _chats: Array.from(card.chats.entries()), // Convert Map to an array of entries
            _title: card.title,
        }));

        localStorage.setItem("cards", JSON.stringify(cardsToSave));
    }

    // Adds a new card to the list and saves it
    public addCard(card: Card): void {
        this._cards.push(card);
        this.saveCards();
    }

    // Removes a card from the list by index and saves the updated list
    public removeCard(index: number): void {
        this._cards.splice(index, 1);
        this.saveCards();
    }

    // Retrieves all the cards
    public getCards(): Card[] {
        return this._cards;
    }
}

// Object for each card that holds their information
class Card {
    private _chats: Map<MessageInfo, String>;
    private _title: string;
    private _currentId: number;

    public get title(): string {
        return this._title;
    }

    public set title(newTitle: string) {
        this._title = newTitle;
    }

    public get chats(): Map<MessageInfo, String> {
        return this._chats;
    }

    constructor(chats?: Map<MessageInfo, String>, title?: string) {
        this._chats = chats || new Map<MessageInfo, String>();
        this._title = title || "untitled";
        this._currentId = 0;

        if (this._chats.size > 0) {
            this._currentId = Math.max(...Array.from(this._chats.keys()).map(info => info.id)) + 1;
        }
    }

    public async addChat(message: string, userSent: boolean) {
        const info = new MessageInfo(this._currentId, userSent);
        this._chats.set(info, message);

        // adding the card to recent history once there is a message sent
        if (this._currentId === 0) {
            this._title = await AIHandler.getInstance().generateCardTitle(Array.from(this._chats.values()))
            CardHandler.getInstance().addCard(this);
        }

        this._currentId++;
    }
}

class MessageInfo {
    private _id: number;
    private _userSent: boolean;

    public get id(): number {
        return this._id;
    }

    public get userSent(): boolean {
        return this._userSent;
    }

    constructor(id: number, userSent: boolean) {
        this._id = id;
        this._userSent = userSent;
    }
}

export { CardHandler, Card };
