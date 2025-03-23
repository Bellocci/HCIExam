import { NgModule } from "@angular/core";

import { AccordionModule } from 'primeng/accordion';
import { AnimateModule } from "primeng/animate";
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { DeferModule } from "primeng/defer";
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { ImageModule } from "primeng/image";
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from "primeng/panel";
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    exports: [
        AccordionModule,
        AnimateModule,
        AvatarModule,
        ButtonModule,
        CheckboxModule,
        DataViewModule,    
        DeferModule,
        DividerModule,
        DropdownModule,
        DynamicDialogModule,
        ListboxModule,
        ImageModule,
        InputNumberModule,
        InputSwitchModule,
        InputTextModule,
        KeyFilterModule,
        MessagesModule,
        PanelModule,
        PasswordModule,
        RadioButtonModule,
        SelectButtonModule,
        SidebarModule,
        StepsModule,
        TableModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule
    ]
})
export class PrimeNgModule {}