export class Contact {
    public id: string | undefined;
    public recipientId: string | undefined;
    public salutation: string | undefined;
    public firstName: string | undefined;
    public lastName: string | undefined;
    public fullName: string | undefined;
    public email: string | undefined;
    public phoneNumber: string | undefined;
    public updatedAt: Date | undefined;
}

export class ContactResultSet {
    public count!: number;
    public items!: Contact[];
}