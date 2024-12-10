import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { DynamicDialogConfigBuilderImpl } from "../DynamicDialogConfigBuilderImpl";
import { BreakpointsService } from "src/app/service/breakpoints.service";

export class SignupDialogHelper {
    public static readonly DEFAULT_WIDTH = '40%';
    public static readonly DEFAULT_HEIGHT = 'auto';

    getDynamicDialogConfig(width?:string, height?:string) : DynamicDialogConfig {

        if(width == undefined) {
            let windowWidth = window.innerWidth;
            if(BreakpointsService.isEqualOrGreaterThanLargeDeviceBreakpoint(windowWidth)) {
                width = "50%";
                height = SignupDialogHelper.DEFAULT_HEIGHT;
            } else if(BreakpointsService.isEqualOrGreaterThanTabletBreakpoint(windowWidth)) {
                width = "70%";
                height = SignupDialogHelper.DEFAULT_HEIGHT;
            } else {
                width = "100%";
                height = "100%";
            }
        }

        return new DynamicDialogConfigBuilderImpl()
            .Builder()
            .withWidth(width)
            .widthHeight(height)
            .withHeader("Registrazione")
            .withAutoZIndex(true)
            .withMaximizable(true)
            .withModal(true)
            .withCloseOnEscape(true)
            .withTransitionOptions("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")
            .build();
    }
}