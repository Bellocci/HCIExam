import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { DynamicDialogConfigBuilderImpl } from "../DynamicDialogConfigBuilderImpl";

export class LoginDialogHelper {
    public static readonly DEFAULT_WIDTH = '40%';
    public static readonly DEFAULT_HEIGHT = 'auto';

    getDynamicDialogConfig(width?:string, height?:string) : DynamicDialogConfig {
        return new DynamicDialogConfigBuilderImpl()
            .Builder()
            .withWidth(width ? width : LoginDialogHelper.DEFAULT_WIDTH)
            .widthHeight(height ? height : LoginDialogHelper.DEFAULT_HEIGHT)
            .withHeader("Login")
            .withAutoZIndex(true)
            .withMaximizable(true)
            .withModal(true)
            .withCloseOnEscape(true)
            .withTransitionOptions("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")
            .build();
    }
}