class CardHandler {

    // holds all the cards informatoin
    private _cards: Card[] = [];

    constructor() {
        this.retrieveCards();
    }

    // retrieves all the stored cards information from local storage
    public retrieveCards() {
        const storedCards = localStorage.getItem('cards');
        if (storedCards) {
            const parsedCards = JSON.parse(storedCards);
            this._cards = parsedCards.map((cardData: any) => new Card(
                cardData._chats.map((chatData: any) => new Map(chatData)),
                cardData._title
            ));
        }
    }

    // saves all the stored cards information to local storage
    public saveCards(): void {
        localStorage.setItem('cards', JSON.stringify(this._cards));
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
    private _chats: Map<MessageInfo, String>[];
    private _title: string;

    public get title(): string {
        return this._title;
    }

    public set title(newTitle: string) {
        this._title = newTitle;
    }

    public get chats(): Map<MessageInfo, String>[] {
        return this._chats;
    }

    constructor(chats?: Map<MessageInfo, String>[], title?: string) {
        this._chats = chats || [];
        this._title = title || "untitled";
    }

    public addChat(message: string, userSent: boolean) {
        const chat = new Map<MessageInfo, String>();
        this._chats.push(chat);
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