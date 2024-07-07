import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  /*
   * ==========
   * VARIABILI
   * ==========
   */

  @Input() viewSmallAvatar:boolean = false;

  private _file: String = "assets/images/userProfile-removebg-preview.png";
  private _isFileUpdated: boolean = false;

  /*
   * ============
   * CONSTRUCTOR 
   * ============
   */
  constructor(private userService:UserService) { 
    console.log("Construct Avatar component");
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  public get file(): String {
    return this._file;
  }

  public set file(value: String) {
    this._file = value;
  }

  public get isFileUpdated(): boolean {
    return this._isFileUpdated;
  }

  public set isFileUpdated(value: boolean) {
    this._isFileUpdated = value;
  }

  /*
   * ============
   * VISIBILITA' 
   * ============
   */

  /*
   * =========
   * LISTENER 
   * =========
   */

  onUpdateFile(event:any) {
    const files = event.target.files as FileList;

    if(files.length > 0) {
      const _fileToUpdate = URL.createObjectURL(files[0]);
      this.file = _fileToUpdate;
      this.resetInput();
      this.isFileUpdated = true;
    }
  }

  onResetFile(){
    this.file = "assets/images/userProfile-removebg-preview.png";
    this.isFileUpdated = false;
  }

  /*
   * ===============
   * METODI PRIVATI
   * =============== 
   */

  private resetInput(){
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
 }
}
