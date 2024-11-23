import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { DynamicDialogConfigBuilder, DynamicDialogConfigStep } from "./DynamicDialogConfigBuilder";

export class DynamicDialogConfigBuilderImpl implements DynamicDialogConfigBuilder {
    
    Builder(): DynamicDialogConfigStep<any> {
        return new DynamicDialogConfigStepImpl();
    }

}

export class DynamicDialogConfigStepImpl implements DynamicDialogConfigStep {

    private dialogConfig:DynamicDialogConfig = new DynamicDialogConfig();

    build(): DynamicDialogConfig {
        return this.dialogConfig;
    }

    withAutoZIndex(autoZIndex?: boolean): this {
        this.dialogConfig.autoZIndex = autoZIndex;
        return this;
    }

    withBazeZIndex(baseZIndex?: number): this {
        this.dialogConfig.baseZIndex = baseZIndex;
        return this;
    }

    withCloseOnEscape(closeOnEscape?: boolean): this {
        this.dialogConfig.closeOnEscape = closeOnEscape;
        return this;
    }

    withData(data?: any): this {
        this.dialogConfig.data = data;
        return this;
    }

    withFooter(footer?: string): this {
        this.dialogConfig.footer = footer;
        return this;
    }

    withHeader(header?: string): this {
        this.dialogConfig.header = header;
        return this;
    }
    
    widthHeight(height?: string): this {
        this.dialogConfig.height = height;
        return this;
    }

    withMaximizable(maximizable?: boolean): this {
        this.dialogConfig.maximizable = maximizable;
        return this;
    }

    withModal(modal?: boolean): this {
        this.dialogConfig.modal = modal;
        return this;
    }

    withPosition(position?: string): this {
        this.dialogConfig.position = position;
        return this;
    }

    withResizable(resizable?: boolean): this {
        this.dialogConfig.resizable = resizable;
        return this;
    }

    withShowHeader(showHeader?: boolean): this {
        this.dialogConfig.showHeader = showHeader;
        return this;
    }

    withStyle(style?: { [klass: string]: any; } | null | undefined): this {
        this.dialogConfig.style = style;
        return this;
    }

    withStyleClass(styleClass?: string): this {
        this.dialogConfig.styleClass = styleClass;
        return this;
    }

    withTransitionOptions(transitionOptions?: string): this {
        this.dialogConfig.transitionOptions = transitionOptions;
        return this;
    }

    withWidth(width?: string): this {
        this.dialogConfig.width = width;
        return this;
    }
}