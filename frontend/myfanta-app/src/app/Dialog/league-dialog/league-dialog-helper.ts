import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { DynamicDialogConfigBuilderImpl } from "../DynamicDialogConfigBuilderImpl";

export class LeagueDialogHelper {

    public static readonly DEFAULT_WIDTH = '70%';
    public static readonly DEFAULT_HEIGHT = '80%';

    getDynamicDialogConfig(width?:string, height?:string) : DynamicDialogConfig {
        return new DynamicDialogConfigBuilderImpl()
            .Builder()
            .withWidth(width ? width : LeagueDialogHelper.DEFAULT_WIDTH)
            .widthHeight(height ? height : LeagueDialogHelper.DEFAULT_HEIGHT)
            .withHeader("Seleziona un campionato")
            .withAutoZIndex(true)
            .withMaximizable(true)
            .withModal(true)
            .withCloseOnEscape(true)
            .withTransitionOptions("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")
            .build();
    }
}