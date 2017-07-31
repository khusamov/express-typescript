
import ViewModel from './ViewModel';

export default class ErrorViewModel extends ViewModel {
    
    get error(): Error {
        return this.data.error;
    }
    
    set error(err: Error) {
        this.data.error = err;
    }
    
}