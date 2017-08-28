export interface IDialogData {
   dialogText: string;
   dialogType: number;
   dialogTitle: string;
   messageType: string; // 'info', //warning error,
   resultButton: number;
   dialogShow: boolean;
}
export class DialogData implements IDialogData {
   dialogText: string;
   dialogType: number;
   dialogTitle: string;
   messageType: string;
   resultButton: number;
   dialogShow: boolean;

}
