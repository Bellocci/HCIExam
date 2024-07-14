
export class UserProfilePhotoEntity {

    private _photoFileName: string = "";    
    private _binaryContent: string = "";    

    constructor() {}

    public get photoFileName(): string {
        return this._photoFileName;
    }

    public set photoFileName(value: string) {
        this._photoFileName = value;
    }

    public get binaryContent(): string {
        return this._binaryContent;
    }
    
    public set binaryContent(value: string) {
        this._binaryContent = value;
    }

    convertBinaryContentToUrl(binaryContent: string): string {
        // Rimuovi la parte "b'" e l'apice finale della stringa se necessario
        binaryContent = binaryContent.replace(/^b'|\'$/g, '');
        // Decodifica la stringa binaria in Base64
        return `data:image/jpeg;base64,${binaryContent}`;
    }
}