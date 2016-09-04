import fs               from "fs";
import { dispatch }     from "../dispatchers/AppDispatcher";
import AppConstants     from "../constants/AppConstants";
import EditorConstants  from "../constants/EditorConstants";
import EmitterDecorator from "../decorators/EmitterDecorator";

@EmitterDecorator
class EditorActions {
    requestOpenFile() {
        this.emitGlobalEvent( EditorConstants.EDITOR_OPEN_FILE_REQUEST );
    }

    handleOpenFile( path ) {
        fs.readFile( path, "utf8", ( error, data ) => {
            if ( error ) {
                dispatch( EditorConstants.EDITOR_OPEN_FILE_FAILURE, {
                    path    : path,
                    error   : error
                } );
            } else {
                dispatch( EditorConstants.EDITOR_OPEN_FILE_SUCCESS, {
                    path    : path,
                    content : data
                } );
            }
        } );
    }
};

export default new EditorActions();
