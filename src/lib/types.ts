export interface UserData {
    authenticated: boolean;
    current_user: {
        name: string;
        email: string;
        picture: string;
    } | null;
    subscription_plan: string | null;
}

export interface Product {
    id: string,
    name: string,
    description: string,
    images: [string],
    price_id: string,
    price_amount: number,
    price_currency: string,
    one_time: boolean,
    recurring_interval: string | null,
    formatted_price: string,
}

export interface ChatMessage {
    id?: string;
    chat_id?: string;   
    message_text: string
    role: string;
    timestamp: string; //update later
}