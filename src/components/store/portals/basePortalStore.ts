import { action, makeObservable, observable } from "mobx";

class BasePortalStore {
    constructor() {
        makeObservable(this, {
            isOpen: observable,
            open: action,
            close: action
        }
        )
    }
    isOpen = false;

    open() {
        this.isOpen = true
    }

    close() {
        this.isOpen = false
    }
}

export default BasePortalStore