import { DynamicDialogConfig } from "primeng/dynamicdialog";

export interface DynamicDialogConfigBuilder<T = any> {
    Builder():DynamicDialogConfigStep<T>;
}

export interface DynamicDialogConfigStep<T = any> {
    build():DynamicDialogConfig;
    withAutoZIndex(autoZIndex?:boolean):this;
    withBazeZIndex(baseZIndex?:number):this; 
    withCloseOnEscape(closeOnEscape?:boolean):this;       
    withData(data?:T):this;
    withFooter(footer?:string):this;
    withHeader(header?:string):this;
    widthHeight(height?:string):this;
    withMaximizable(maximizable?:boolean):this;
    withModal(modal?:boolean):this;
    withPosition(position?:string):this;
    withResizable(resizable?:boolean):this;
    withShowHeader(showHeader?:boolean):this;
    withStyle(style?:{ [klass: string]: any } | null | undefined):this;
    withStyleClass(styleClass?:string):this;
    withTransitionOptions(transitionOptions?:string):this;
    withWidth(width?:string):this;
}