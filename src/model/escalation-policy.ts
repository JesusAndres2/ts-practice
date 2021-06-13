import Target from "./target";
import * as R from "ramda";

export default class EscalationPolicy {
    /**
     * Service identifier
     */
    private serviceId: number;

    /**
     * List of targets allocated to this policy
     */
    private targets: Target[];
    
    /**
     * The last target notified.
     * Can be null if no notification sent yet
     */
    private lastLevel: Target | null;

    constructor(serviceId: number, targets: Target[], lastLevel: Target) {
        this.serviceId = serviceId;
        this.lastLevel = lastLevel;
        // sort by level ascendant
        this.targets = targets.sort((a, b) => (a.getLevel() > b.getLevel()) ? 1 : ((b.getLevel() > a.getLevel()) ? -1 : 0));
    }

    /**
     * Increment the field lastLevel target to the next in the sorted array
     */
    public setNextEscalationPolicy() {
        // TODO: Assumming targets is not empty
        if (this.lastLevel === null) {
            this.lastLevel = this.getTargets()[0];
        } else {
            // findIndex of LastLevel
            const foundIndex: number = R.findIndex(R.propEq("level",this.lastLevel.getLevel()))(this.getTargets());
            // TODO: assuming index is not -1
            const targets: Target[] = this.getTargets();
            // last level reached, retry. Else, set next the following item in array
            this.lastLevel = foundIndex === targets.length -1 ? targets[foundIndex] : targets[foundIndex +1];
        }
    }

    // Getters and setters
    public getServiceId(): number {
        return this.serviceId;
    }
    public getTargets() {
        return this.targets;
    }
    public getLastLevel() {
        return this.lastLevel;
    }
    public setServiceId(serviceId: number) {
        this.serviceId = serviceId;
    }
    public setTargets(targets: Target[]) {
        this.targets = targets;
    }
    public setLastLevel(lastLevel: Target) {
        this.lastLevel = lastLevel;
    }
}