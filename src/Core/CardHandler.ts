import AIHandler from "./AIHandler";
import { AddCardEvent, ChatEvent } from "./ChatEvents";

/**
 * CardHandler
 *
 * Handles the storage (locally) of cards, which are collections of messages.
 * Has only one static instance that is shared across the application.
 */
class CardHandler {
    private static instance: CardHandler; // holds the common instance of the CardHandler

    private _cards: Card[] = []; // cached list of cards
    private _currentCard: Card; // the current instance of the card being viewed

    public get cards(): Card[] {
        return this._cards;
    }

    public get currentCard(): Card {
        return this._currentCard;
    }

    public set currentCard(newCard: Card) {
        this._currentCard = newCard;
        new ChatEvent().Dispatch();
    }

    /**
     * On creating a new instance (on opening the website), retrieves the cards from local storage
     * sets the current viewed card as an empty card
     */
    constructor() {
        this.RetrieveCards();
        this._currentCard = new Card();
    }

    /**
     * Retrieves the common instance of the CardHandler
     *
     * If the instance does not exist, it creates a new instance
     * @returns the instance of the CardHandler
     */
    public static GetInstance(): CardHandler {
        if (!CardHandler.instance) {
            CardHandler.instance = new CardHandler();
        }

        return CardHandler.instance;
    }

    /**
     * Retrieves all the stored cards information from local storage
     *
     * Adds retrieved cards to the cached _cards array
     * @returns void
     */
    public RetrieveCards() {
        const storedCards = localStorage.getItem("cards");
        if (storedCards) {
            const parsedCards = JSON.parse(storedCards);

            // Convert parsed JSON back to a Map<MessageInfo, string>
            this._cards = parsedCards.map((cardData: any) => {
                // Convert the array of entries back to a Map
                const chatEntries = Array.isArray(cardData._chats)
                    ? cardData._chats.map(([key, value]: [any, string]) => [
                          new MessageInfo(key._id, key._userSent),
                          value,
                      ])
                    : []; // If _chats is not an array, fallback to an empty array to prevent errors
                    
                // Convert the array of entries back to a Map for sources
                const sourceEntries = Array.isArray(cardData._sources)
                    ? cardData._sources.map(([key, value]: [string, string]) => [
                            key,
                            value,
                        ])
                    : []; // If _sources is not an array, fallback to an empty array to prevent errors

                return new Card(new Map(chatEntries), new Map(sourceEntries), cardData._title);
            });
        }
    }

    /**
     * Saves all the stored cards information to local storage\
     *
     * @returns void
     */
    public SaveCards(): void {
        const cardsToSave = this._cards.map((card) => ({
            _chats: Array.from(card.chats.entries()), // Convert Map to an array of entries
            _sources: Array.from(card.sources.entries()), // Convert Map to an array of entries
            _title: card.title,
        }));

        localStorage.setItem("cards", JSON.stringify(cardsToSave));
    }

    /**
     * Adds a new card to the list and saves to local storage
     *
     * @param card - the instance of the card
     */
    public AddCard(card: Card): void {
        this._cards.push(card);
        new AddCardEvent().Dispatch();
        this.SaveCards();
    }

    /**
     * Removes a card from the list by index and saves the updated list
     *
     * @param index - the index of the card to remove
     */
    public RemoveCard(index: number): void {
        this._cards.splice(index, 1);
        this.SaveCards();
    }
}

/**
 * Card (object)
 *
 * Represents a card, which is a collection of messages.
 */
class Card {
    private _chats: Map<MessageInfo, string>; // stores the messages in the card
    private _sources: Map<string, string>; // stores the 5 words summaries and the sources in format [summary, source]
    private _title: string;
    private _currentId: number; // the id of the next message to be added

    private _botIsTyping: boolean = false; // whether the bot is currently typing

    public get title(): string {
        return this._title;
    }

    public set title(newTitle: string) {
        this._title = newTitle;
    }

    public get chats(): Map<MessageInfo, string> {
        return this._chats;
    }

    public get sources(): Map<string, string> {
        return this._sources;
    }

    public get botIsTyping(): boolean {
        return this._botIsTyping;
    }

    /**
     * Initalizes the card
     * parameters used if importing from local storage
     *
     * @param chats - the messages in the card
     * @param title - the title of the card
     */
    constructor(chats?: Map<MessageInfo, string>, sources?: Map<string, string>, title?: string) {
        this._chats = chats || new Map<MessageInfo, string>();
        this._sources = sources || new Map<string, string>();
        this._title = title || "untitled";
        this._currentId = 0;

        if (this._chats.size > 0) {
            this._currentId =
                Math.max(
                    ...Array.from(this._chats.keys()).map((info) => info.id),
                ) + 1;
        }
    }

    /**
     * Adds a message to the card
     * generates the title of the card if it is the first message
     *
     * @param message - the message to be added to the card
     * @param userSent - whether the message was sent by the user or the bot
     */
    public async AddChat(message: string, userSent: boolean) {

        if (this.botIsTyping && userSent) {
            console.error("Bot is typing, cannot send message");
            return;
        } else if (userSent) { // if the user sent this message, the bot is typing
            this._botIsTyping = true;
        } else if (!userSent) { // if the bot sent this message, the bot has stopped typing
            this._botIsTyping = false;
        }

        this._chats.set(new MessageInfo(this._currentId, userSent), message); // add the message to the card

        if (this._currentId === 0) { // adding title and card to the card handler if it is the first message
            this._title = await AIHandler.GetInstance().GenerateCardTitle(
                Array.from(this._chats.values()),
            );
            CardHandler.GetInstance().AddCard(this);
        }

        CardHandler.GetInstance().SaveCards();
        this._currentId++;
    }

    /**
     * Adds a source to the card
     * generates a 5 word summary of the source
     * 
     * @param source - the source to be added to the card
     */
    public async AddSource(source: string): Promise<boolean> {
        this._sources.set(await AIHandler.GetInstance().GenerateSourceSummary(source), source)
        CardHandler.GetInstance().SaveCards();

        return true;
    }

    /** 
     * Removes a source from the card 
     * 
     * @param source - the summary of the source to be removed
     */
    public RemoveSource(source: string) {
        this._sources.delete(source);
    }
}

/**
 * MessageInfo (object)
 *
 * Represents the information of a message, including the id and whether it was sent by the user or the bot.
 */
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
