export interface User {
    id: string;
    phone: string;
    role: "farmer" | "officer";
    createdAt: Date;
    name?: string;
    location?: string;
}

export interface Query {
    id: string;
    userId: string;
    type: "text" | "voice" | "image";
    content: string;
    createdAt: Date;
    status: "pending" | "answered" | "escalated";
}

export interface Response {
    id: string;
    queryId: string;
    source: "ai" | "officer";
    content: string;
    createdAt: Date;
    confidence?: number;
}

export interface Escalation {
    id: string;
    queryId: string;
    reason: string;
    status: "open" | "in_review" | "resolved";
    assignedOfficerId?: string;
    createdAt: Date;
}
