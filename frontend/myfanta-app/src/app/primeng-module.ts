import { NgModule } from "@angular/core";

import { AccordionModule } from 'primeng/accordion';
import { AnimateModule } from "primeng/animate";
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from "primeng/button";
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { DeferModule } from "primeng/defer";
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { ImageModule } from "primeng/image";
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from "primeng/panel";
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    exports: [
        AccordionModule,
        AnimateModule,
        AvatarModule,
        ButtonModule,
        DataViewModule,    
        DeferModule,
        DropdownModule,
        DynamicDialogModule,
        ListboxModule,
        ImageModule,
        InputTextModule,
        KeyFilterModule,
        MessagesModule,
        PanelModule,
        PasswordModule,
        RadioButtonModule,
        SidebarModule,
        StepsModule,
        TableModule,
        TieredMenuModule,
        ToastModule,
        ToolbarModule
    ]
})
export class PrimeNgModule {}