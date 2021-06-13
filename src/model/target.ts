/**
 * Represents a target. Can contains an email or phone to notify 
 * outgoing events to Notificatios services
 */
export default class Target {
    /**
     * target email: aaa@bbb.ccc
     */
    private email: string | null;
    /**
     * Target Phone.
     * String, assuming phone with countru prefix "+xxyyyyyyyyy"
     */
    private phone: string | null;

    /**
     * Target level notification
     */
    private level: number;

    constructor(email: string | null, phone: string | null, level: number) {
        this.email = email;
        this.phone = phone;
        this.level = level;
    }

    // Getters and setters
    public getEmail() {
        return this.email;        
    }
    public getPhone() {
        return this.phone;
    }
    public getLevel() {
        return this.level;
    }
    public setEmail(email: string) {
        this.email = email;
    }
    public setPhone(phone: string) {
        this.phone = phone;
    }
    public setLevel(level: number) {
        this.level = level;
    }
}