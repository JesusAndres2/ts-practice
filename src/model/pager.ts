export default class Pager {
    /**
     *  Service Id number
     */
    private id: number;

    /**
     *  If service is healthy
     */
    private isHealthy: boolean;

    /**
     *  If service alert is Acknowledged
     */
    private alertAcknowledged: boolean;

    constructor(id: number, isHealthy: boolean, alertAcknowledged: boolean) {
        this.id = id;
        this.isHealthy = isHealthy;
        this.alertAcknowledged = alertAcknowledged;
    }

    // Getters and setters
    public getId() {
        return this.id;
    }
    public getIsHealthy() {
        return this.isHealthy;
    }
    public getAlertAcknowledged() {
        return this.alertAcknowledged;
    }
    public setId(id: number) {
        this.id = id;
    }
    public setIsHealthy(isHealthy: boolean) {
        this.isHealthy = isHealthy;
    }
    public setAlertAcknowledged(alertAcknowledged: boolean) {
        this.alertAcknowledged = alertAcknowledged
    }
}
