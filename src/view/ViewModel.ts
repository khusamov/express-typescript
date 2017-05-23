
export default class ViewModel {
    
    private _data;
    
    get data() {
        return this._data;
    }
    
    set data(data) {
        if (typeof data != "object") {
            data = {
                body: data
            };
        }
        this._data = data;
    }
    
    constructor(data?: any) {
        this.data = data;
    }
    
    toJson(): any {
        return "toJson" in this.data ? this.data.toJson() : this.data;
    }
    
}